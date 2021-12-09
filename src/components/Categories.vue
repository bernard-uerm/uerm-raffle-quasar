<template>
  <div class="q-mt-xl">
    <q-card class="card-category text-white">
      <q-card-section class="bg-red-6">
        <div class="text-h3 text-weight-thin text-uppercase text-white">
          {{raffleDetails.raffleName}}
        </div>
      </q-card-section>
      <q-form class="q-gutter-xs" ref="requestForm">
        <q-card-section style="height:300px;" v-if="showLoading"></q-card-section>
        <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
          <div v-show="showCard">
            <div v-if="showDrawCard">
              <q-card-section class="q-mt-lg">
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
                  style="padding-bottom: 15px"
                  lazy-rules
                  color="red-6"
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
                  color="red-6"
                  :rules="[ val => val && val.length > 0 || 'Please enter the number of winners']"
                >
                </q-input>
              </q-card-section>
              <q-card-section>
                <p class="text-primary">
                  <q-badge outline color="orange" class="text-h5" :label="winners +'/'+ expectedWinners +' Winners'" />
                </p>
              </q-card-section>
              <q-card-actions class="bg-red-6 q-pa-lg" align="center">
                <q-btn-group push>
                  <q-btn push v-if="this.raffleStatus"
                    @click="draw()"
                    color="primary"
                    class="text-white"
                    icon="book_online"
                    size="lg"
                    label="DRAW"
                    :disable="disableButton"
                  >
                  </q-btn>
                  <q-btn push v-if="!this.raffleStatus"
                    @click="getWinners()"
                    color="secondary"
                    class="text-white"
                    icon="book_online"
                    size="lg"
                    label="WINNERS"
                  >
                  </q-btn>
                  <q-btn push
                    @click="setInit()"
                    color="negative"
                    class="text-white"
                    icon="logout"
                    size="lg"
                    label="BACK"
                  >
                  </q-btn>
                </q-btn-group>
              </q-card-actions>
            </div>
          </div>
        </transition>
        <q-inner-loading :showing="showLoading">
          <q-spinner-cube size="xl" color="red-6" />
        </q-inner-loading>

        <q-inner-loading :showing="this.drawLoading" style="padding-top: -10px;">
          <q-spinner-pie size="180px" color="red-6" />
          <h4 class="text-black">LOADING WINNERS</h4>
        </q-inner-loading>
      </q-form>
    </q-card>
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
      showDrawCard: true,
      drumRoll: require('../assets/sounds/drum-roll.mp3'),
      winners: 0,
      expectedWinners: 0,
      raffleWinners: [],
      disableButton: true
    }
  },
  computed: {
    ...mapGetters([
      'categories',
      'currentWinners',
      'raffleDetails',
      'raffleEntries',
      'finalRaffleEntryWinners'
    ])
  },
  watch: {
    async drawCategories (val) {
      if (val !== null) {
        if (this.drawNumbers !== null) {
          this.disableButton = false
        }
      }
      this.getRaffleEntries()
    },
    drawNumbers (val) {
      console.log(val)
      this.validateDraw()
      if (val !== null) {
        this.disableButton = false
      }

      if (val === '') {
        this.disableButton = true
      }
    }
    // raffleEntries (val) {
    //   console.log(val)
    // },
    // raffleWinners (val) {
    //   console.log(val)
    // }
  },
  methods: {
    async validateDraw () {
      if (Number(this.drawNumbers) > Number(this.raffleDetails.raffleExpectedWinners)) {
        this.disableButton = true
        return false
      } else {
        this.disableButton = false
        return true
      }
    },
    async shuffleEntries () {
      // for (let i = this.raffleEntries.length - 1; i > 0; i--) {
      //   const j = Math.floor(Math.random() * (i + 1))
      //   [this.raffleEntries[i], this.raffleEntries[j]] = [this.raffleEntries[j], this.raffleEntries[i]]
      // }
      // console.log(this.raffleWinners[0].sort(() => Math.random() - 0.5))
      const shuffle = await this.$store.dispatch('shuffleRaffleEntries', this.drawNumbers)
      console.log(shuffle)
    },
    async reShuffleEntries () {
      // for (let i = this.raffleEntries.length - 1; i > 0; i--) {
      //   const j = Math.floor(Math.random() * (i + 1))
      //   [this.raffleEntries[i], this.raffleEntries[j]] = [this.raffleEntries[j], this.raffleEntries[i]]
      // }
      // console.log(this.raffleWinners[0].sort(() => Math.random() - 0.5))
      const shuffle = await this.$store.dispatch('shuffleRaffleEntries', this.drawNumbers)
      console.log(shuffle)
    },
    cardLoading () {
      this.showLoading = true
      setTimeout(() => {
        this.showLoading = false
        this.showCard = false
        this.showCard = true
        this.expectedWinners = this.raffleDetails.raffleExpectedWinners
        if (this.currentWinners.length > 0) {
          this.winners = this.currentWinners.length
        }
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
    async getRaffleEntries () {
      await this.$store.dispatch('getRaffleEntries', this.drawCategories)
    },
    async draw () {
      var drums = new Audio(this.drumRoll)
      drums.play()
      const validate = await this.validateDraw()
      this.drawLoading = true
      if (validate) {
        this.$refs.requestForm.validate().then(async valid => {
          if (!valid) {
            this.formHasError = true
          } else {
            this.raffleWinners.push(this.raffleEntries)
            const entries = await this.shuffleEntries()
            console.log(entries)
            if (this.finalRaffleEntryWinners.length > 0) {
              for (var entryWinners of this.finalRaffleEntryWinners) {
                entryWinners.entry_id = entryWinners.user_code
                entryWinners.raffle_id = this.raffleDetails.raffleID
              }
              var saveRaffleWinners = await this.$store.dispatch('saveRaffleWinners', this.finalRaffleEntryWinners)
              console.log(saveRaffleWinners)
              this.getRaffleEntries()
            }
            if (saveRaffleWinners.success !== undefined) {
              // drums.pause()
              // this.$router.push('/winners/' + this.drawCategories)
              setTimeout(() => {
                this.drawLoading = false
                this.showDrawCard = false
                this.showDrawCard = true
                drums.pause()
                this.$router.push('/winners-list/' + this.raffleDetails.raffleID)
              }, 5000)
            }
            // const raffleInfo = {
            //   category: this.drawCategories,
            //   drawNumbers: this.drawNumbers
            // }
            // const randomWinners = await this.$store.dispatch('getRandomWinners', raffleInfo)
            // if (randomWinners.length > 0) {
            //   this.drawLoading = true
            //   for (var winners of randomWinners) {
            //     const winnerInfo = {
            //       employee_code: winners.id,
            //       raffle_id: this.raffleDetails.raffleID
            //     }
            //     await this.$store.dispatch('setWinners', winnerInfo)
            //   }
            // }
            // setTimeout(() => {
            //   this.drawLoading = false
            //   this.showDrawCard = false
            //   this.showDrawCard = true
            //   drums.pause()
            //   this.$router.push('/winners/' + this.drawCategories)
            // }, 5000)
          }
        })
      }
    },
    async getWinners () {
      var drums = new Audio(this.drumRoll)
      drums.play()
      this.drawLoading = true
      setTimeout(() => {
        this.drawLoading = false
        this.showDrawCard = false
        this.showDrawCard = true
        drums.pause()
        this.$router.push('/winners-list/' + this.raffleDetails.raffleID)
      }, 5000)
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
</style>
