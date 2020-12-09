<template>
  <q-page class="flex flex-center" style="padding-top: 120px;">
    <div class="row">
      <div class="col-12 text-center q-pt-md">
        <Categories :raffleStatus='this.raffleStatus' />
      </div>
    </div>
  </q-page>
</template>

<script>
import Categories from 'components/Categories.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    Categories
  },
  computed: {
    ...mapGetters([
      'raffleDetails',
      'currentWinners'
    ])
  },
  data () {
    return {
      raffleInfo: {
        raffleID: null,
        raffleName: null
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
