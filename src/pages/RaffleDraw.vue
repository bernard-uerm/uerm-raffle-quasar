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
  components: {
    Categories,
    Winners
  },
  computed: {
    ...mapGetters([
      'raffleDetails',
      'currentWinners',
      'winnersStatus'
    ])
  },
  data () {
    return {
      raffleInfo: {
        raffleID: null,
        raffleName: null,
        rafflePrice: null
      },
      raffleStatus: true
    }
  },
  created () {
    console.log(this.winnersStatus)
    this.getSpecificRaffle()
    this.raffleInfo.raffleID = this.$route.params.id
    this.getCategories()
    this.getCurrentWinners()
  },
  methods: {
    async getSpecificRaffle () {
      console.log(this.currentWinners, 'lol')
      const raffles = await this.$store.dispatch('getRaffles')
      if (raffles.length > 0) {
        // eslint-disable-next-line eqeqeq
        const result = raffles.filter(item => item.id == this.raffleInfo.raffleID)
        this.raffleInfo.raffleName = result[0].name
        this.raffleInfo.rafflePrice = result[0].price
        await this.$store.dispatch('setRaffleDetails', this.raffleInfo)
      }
    },
    async getCategories () {
      await this.$store.dispatch('getCategories')
    },
    async getCurrentWinners () {
      await this.$store.dispatch('getCurrentWinners', this.raffleInfo.raffleID)
      if (this.currentWinners.status === 'Complete') {
        this.raffleStatus = false
      }
    }
  }
}
</script>
