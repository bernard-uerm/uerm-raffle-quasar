<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-12">
        <div class="text-h1 text-primary text-weight-thin text-center">UERM CHRISTMAS RAFFLE</div>
      </div>
      <div class="col-12 text-center q-pt-lg">
        <q-btn color="primary" push
          icon="event_available" large
          :to="'/raffles'"
        >
          <div class="q-pl-sm">Start</div>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>

// import Fireworks from 'components/Fireworks.vue'
export default {
  name: 'PageIndex',
  methods: {
    start () {
      this.$router.push('/raffle')
    }
  }
}
</script>
