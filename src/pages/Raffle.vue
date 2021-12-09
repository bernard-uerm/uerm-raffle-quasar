<template>
  <q-page class="flex flex-center" style="padding-top: 200px;">
    <div class="row q-pa-md">
      <q-card>
        <q-card-section class="bg-red-6">
          <div class="col-12">
            <div class="text-h4 text-white text-weight-thin text-center">RAFFLE</div>
          </div>
        </q-card-section>
        <q-card-section class="bg-yellow-6">
          <div class="col-12 text-center q-pt-md">
            <div class="col-12">
              <Raffles />
            </div>
          </div>
        </q-card-section>
        <q-card-actions
          align="center"
          class="bg-red-6 cursor-pointer"
          v-ripple
          @click="goBack"
        >
            <div class="col-12">
              <div class="text-h5 text-white text-weight-thin text-center">GO BACK</div>
            </div>
          </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Raffles from 'components/Raffles.vue'
export default {
  name: 'Raffle',
  components: {
    Raffles
  },
  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>
