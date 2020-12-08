<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Snowf
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
      />
      <vue-page-transition name="overlay-down-full">
        <router-view />
      </vue-page-transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import Snowf from 'vue-snowf'
export default {
  name: 'MainLayout',
  components: {
    Snowf
  }
}
</script>
<style>
  body {
    background-image: url('~assets/christmas-raffle.jpg') !important;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .card-border-primary {
    border-style: solid;
    border-color: rgba(0,0,0,0.12);
    border-left-color: #1976d2 !important;
    border-right-color: #1976d2 !important;
  }
</style>
