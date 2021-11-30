<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <vue-page-transition name="overlay-down-full" class="bg-yellow">
        <router-view />
      </vue-page-transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>
<style>
  body {
    background-image: url('~assets/christmas-raffle.jpg') !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }
  .card-border-primary {
    border-style: solid;
    border-color: rgba(0,0,0,0.12);
    border-left-color: #1976d2 !important;
    border-right-color: #1976d2 !important;
  }
</style>
