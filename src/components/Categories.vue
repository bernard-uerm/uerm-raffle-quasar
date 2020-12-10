<template>
  <div>
    <form>
      <q-card class="card-category text-white card-border-primary">
        <q-card-section>
          <div class="text-h3 text-weight-thin text-primary">
            {{raffleDetails.raffleName}}
          </div>
        </q-card-section>
        <q-form class="q-gutter-xs" ref="requestForm">
          <transition
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
            <div v-show="showCard">
              <div v-if="showDrawCard">
                <q-card-section>
                  <q-select
                    dense
                    ref="categories"
                    v-model="drawCategories"
                    use-input
                    hide-selected
                    fill-input
                    label="Categories"
                    input-debounce="0"
                    :options="drawCategoriesOptions"
                    @filter="filterCategories"
                    behavior="dialog"
                    style="padding-bottom: 15px"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please enter the category']"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-card-section>
                <q-card-section>
                  <q-input
                    type="number"
                    label="Enter Number of Winners"
                    v-model="drawNumbers"
                    ref="numberOfWinners"
                    :rules="[ val => val && val.length > 0 || 'Please enter the number of winners']"
                  >
                  </q-input>
                </q-card-section>
                <q-card-section>
                  <p class="text-primary">
                    <q-badge outline color="orange" :label="currentWinners.currentWinners +'/'+ currentWinners.expectedWinners +' Winners'" />
                  </p>
                </q-card-section>
                <q-card-actions class="row items-start q-gutter-md justify-center">
                  <q-btn-group push>
                    <q-btn push v-if="this.raffleStatus"
                      @click="draw()"
                      color="primary"
                      class="text-white"
                      icon="book_online"
                      large
                    >
                      DRAW
                    </q-btn>
                    <q-btn push v-if="!this.raffleStatus"
                      @click="getWinners()"
                      color="secondary"
                      class="text-white"
                      icon="book_online"
                      large
                    >
                      WINNERS
                    </q-btn>
                    <q-btn push
                      @click="setInit()"
                      color="negative"
                      class="text-white"
                      icon="logout"
                      large
                    >
                      BACK
                    </q-btn>
                  </q-btn-group>
                </q-card-actions>
              </div>
            </div>
          </transition>
          <q-inner-loading :showing="showLoading">
            <q-spinner-cube size="xl" color="primary" />
          </q-inner-loading>

          <q-inner-loading :showing="this.drawLoading" style="padding-top: -10px;">
            <q-spinner-pie size="180px" color="primary" />
            <h3 class="text-weight-thin text-blue">LOADING WINNERS</h3>
          </q-inner-loading>
        </q-form>
      </q-card>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['raffleStatus'],
  data () {
    return {
      drawCategories: null,
      drawCategoriesOptions: null,
      drawNumbers: null,
      showCard: false,
      showLoading: false,
      drawLoading: false,
      showDrawCard: true
    }
  },
  computed: {
    ...mapGetters([
      'categories',
      'currentWinners',
      'raffleDetails'
    ])
  },
  methods: {
    cardLoading () {
      this.showLoading = true
      setTimeout(() => {
        this.showLoading = false
        this.showCard = false
        this.showCard = true
      }, 3000)
    },
    async setInit () {
      this.$router.push('/raffles')
    },
    filterCategories (val, update) {
      if (val === '') {
        update(() => {
          this.drawCategoriesOptions = this.categories
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.drawCategoriesOptions = this.categories.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    async draw () {
      this.$refs.requestForm.validate().then(async valid => {
        if (!valid) {
          this.formHasError = true
        } else {
          const raffleInfo = {
            category: this.drawCategories,
            drawNumbers: this.drawNumbers
          }
          const randomWinners = await this.$store.dispatch('getRandomWinners', raffleInfo)
          if (randomWinners.length > 0) {
            this.drawLoading = true
            for (var winners of randomWinners) {
              const winnerInfo = {
                employee_code: winners.id,
                raffle_id: this.raffleDetails.raffleID
              }
              await this.$store.dispatch('setWinners', winnerInfo)
            }
            this.drawLoading = false
            this.showDrawCard = false
            this.showDrawCard = true
          }
          this.$router.push('/winners/' + this.drawCategories)
        }
      })
    },
    async getWinners () {
      console.log(this.drawCategories)
      this.$router.push('/winners/' + this.drawCategories)
    }
  },
  created () {
    this.cardLoading()
  }
}
</script>

<style lang="sass" scoped>
.card-category
  width: 500px
  height: 400px
</style>
