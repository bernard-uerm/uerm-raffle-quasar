<template>
  <q-page class="flex flex-center" style="padding-top: 85px;">
    <div class="row">
      <div class="col-12">
        <div class="text-h1 text-primary text-weight-thin text-center">RAFFLE</div>
      </div>
      <div class="col-12 text-center q-pt-md">
        <div class="col-12">
          <Raffles />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Raffles from 'components/Raffles.vue'
export default {
  name: 'Raffle',
  components: {
    Raffles
  }
}
</script>
