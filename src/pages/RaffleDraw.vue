<template>
  <q-page class="flex flex-center" style="padding-top: 120px;">
    <div class="row">
      <div class="col-6 text-center q-pt-md">
        <Categories :raffleStatus='this.raffleStatus' />
      </div>
      <div class="col-6 text-center q-pt-md" v-if="winnersStatus">
        <Winners :raffleStatus='this.raffleStatus' />
      </div>
    </div>
  </q-page>
</template>

<script>
import Categories from 'components/Categories.vue'
import Winners from 'components/Winners.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'RaffleDraw',
  components: {
    Categories,
    Winners
  },
  computed: {
    ...mapGetters([
      'raffleDetails',
      'currentWinners',
      'winnersStatus',
      'duration'
    ])
  },
  data () {
    return {
      raffleInfo: {
        raffleID: null,
        raffleName: null,
        rafflePrize: null,
        raffleExpectedWinners: null
      },
      raffleStatus: true
    }
  },
  created () {
    this.getSpecificRaffle()
    this.raffleInfo.raffleID = this.$route.params.id
    this.getCategories()
    this.getCurrentWinners()
  },
  methods: {
    async getSpecificRaffle () {
      const raffles = await this.$store.dispatch('getRaffles')
      if (raffles.length > 0) {
        // eslint-disable-next-line eqeqeq
        const result = raffles.filter(item => item.id == this.raffleInfo.raffleID)
        this.raffleInfo.raffleName = result[0].name
        this.raffleInfo.rafflePrize = result[0].prize
        this.raffleInfo.raffleExpectedWinners = result[0].expected_winners
        await this.$store.dispatch('setRaffleDetails', this.raffleInfo)
      }
    },
    async getCategories () {
      await this.$store.dispatch('getCategories')
    },
    async getCurrentWinners () {
      await this.$store.dispatch('getCurrentWinners', this.raffleInfo.raffleID)
      if (this.currentWinners.length >= this.raffleDetails.raffleExpectedWinners) {
        this.raffleStatus = false
        await this.$store.dispatch('setRaffleStatus', true)
      } else {
        this.raffleStatus = true
        await this.$store.dispatch('setRaffleStatus', false)
      }
      // if (this.currentWinners.status === 'Complete') {
      //   this.raffleStatus = false
      // }
    }
  }
}
</script>
