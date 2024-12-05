<template>
  <q-page class="flex flex-center">
    <div class="row justify-center">
      <div class="col-lg-12 col-md-12 q-pa-lg">
        <q-card>
          <q-card-section class="bg-blue-10">
            <div class="text-h2 text-white text-center text-weight-thin">UERM RAFFLE</div>
          </q-card-section>
          <q-card-actions
            align="center"
            class="text-weight-thin bg-red-10 cursor-pointer text-h3 text-white"
            v-ripple
            @click="startRaffle"
          >
            START RAFFLE
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12 text-center q-pt-lg">
      </div>
    </div>
  </q-page>
</template>

<script>

// import Fireworks from 'components/Fireworks.vue'
export default {
  name: 'PageIndex',
  methods: {
    startRaffle () {
      this.$router.push('/raffles')
    }
  }
}
</script>
