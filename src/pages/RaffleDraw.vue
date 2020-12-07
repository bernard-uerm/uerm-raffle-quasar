<template>
  <q-page class="flex flex-center" style="padding-top: 85px;">
    <div class="row">
      <div class="col-12 text-center q-pt-md">
        <Categories :raffleName='this.raffleName' />
      </div>
    </div>
  </q-page>
</template>

<script>
import Categories from 'components/Categories.vue'
export default {
  components: {
    Categories
  },
  data () {
    return {
      raffleID: null,
      raffleName: null
    }
  },
  created () {
    this.getSpecificRaffle()
    this.raffleID = this.$route.params.id
  },
  methods: {
    async getSpecificRaffle () {
      const raffles = await this.$store.dispatch('getRaffles')
      if (raffles.length > 0) {
        // eslint-disable-next-line eqeqeq
        const result = raffles.filter(item => item.id == this.raffleID)
        this.raffleName = result[0].name
      }
    }
  }
}
</script>
