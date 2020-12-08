<template>
  <div>
    <form>
      <q-card class="card-category text-white card-border-primary">
        <q-card-section>
          <div class="text-h3 text-weight-thin text-primary">
            {{this.raffleName}}
          </div>
        </q-card-section>
        <div></div>
        <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
          <div v-show="showCard">
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
                :rules="[ val => val && val.length > 0 || 'Please enter the Category']"
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
              <q-input type="number" label="Enter Number of Winners" v-model="drawNumbers"></q-input>
            </q-card-section>
            <q-card-section>
              <p class="text-primary">{{currentWinners.currentWinners}}/{{currentWinners.expectedWinners}} of Winners</p>
            </q-card-section>
            <q-card-actions class="row items-start q-gutter-md justify-center">
              <q-btn-group push>
                <q-btn push
                  @click="draw()"
                  color="primary"
                  class="text-white"
                  icon="book_online"
                  large
                >
                  DRAW
                </q-btn>
                <q-btn push
                  @click="getWinners()"
                  color="secondary"
                  class="text-white"
                  icon="book_online"
                  large
                >
                  DRAW
                </q-btn>
                <q-btn push
                  :to="'/raffles'"
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
        </transition>
        <q-inner-loading :showing="showLoading">
          <q-spinner-cube size="xl" color="primary" />
        </q-inner-loading>
      </q-card>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: [
    'raffleName',
    'raffleID'
  ],
  data () {
    return {
      drawCategories: null,
      drawCategoriesOptions: null,
      drawNumbers: null,
      hasWinners: true,
      showCard: false,
      showLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'categories',
      'currentWinners'
    ])
  },
  methods: {
    cardLoading () {
      this.showLoading = true
      setTimeout(() => {
        this.showLoading = false
        this.showCard = false
        this.getCategories()
        this.getCurrentWinners()
        this.showCard = true
      }, 3000)
    },
    async getCategories () {
      await this.$store.dispatch('getCategories')
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
      const raffleInfo = {
        category: this.drawCategories,
        drawNumbers: this.drawNumbers
      }
      const randomWinners = await this.$store.dispatch('getRandomWinners', raffleInfo)
      if (randomWinners.length > 0) {
        for (var winners of randomWinners) {
          const winnerInfo = {
            employee_code: winners.id,
            raffle_id: this.raffleID
          }
          await this.$store.dispatch('setWinners', winnerInfo)
        }
      }
      this.getCurrentWinners()
      this.$router.push('/winners/' + this.drawCategories)
    },
    async getWinners () {
      this.$router.push('/winners/Faculty')
    },
    async getCurrentWinners () {
      await this.$store.dispatch('getCurrentWinners', this.raffleID)
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
