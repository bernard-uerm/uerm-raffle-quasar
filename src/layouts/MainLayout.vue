<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="front">
      <!-- <Snowf
        :amount="50"
        :size="5"
        :speed="1.5"
        :wind="0"
        :opacity="0.8"
        :swing="1"
        :image="null"
        :zIndex="null"
        :resize="true"
        color="#fff"
      /> -->
      <vue-page-transition name="overlay-down-full">
        <router-view />
      </vue-page-transition>
    </q-page-container>
    <Fireworks class="behind" />
  </q-layout>
</template>

<script>
// import Snowf from 'vue-snowf'
import Fireworks from 'components/Fireworks.vue'
export default {
  name: 'MainLayout',
  components: {
    Fireworks
  }
}
</script>
<style>
  .front {
    display: block;
    z-index: 5;
    position: relative;
  }
  .behind {
    display: block;
  }
  body {
    background-image: url('~assets/christmas-raffle.jpg') !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }
  .card-border-primary {
    border-style: solid;
    border-color: rgba(0,0,0,0.12);
    border-left-color: #1867c0 !important;
    border-right-color: #1867c0 !important;
  }
  .overlay-left,  .overlay-right,  .overlay-top,  .overlay-bottom   {
    background: #1867c0 !important;
  }
</style>
