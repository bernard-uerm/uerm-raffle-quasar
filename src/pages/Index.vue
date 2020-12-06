<template>
  <q-page class="flex flex-center">
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
    <div class="row">
      <div class="col-12">
        <div class="text-h1 text-white text-weight-thin text-center">UERM CHRISTMAS RAFFLE</div>
      </div>
      <div class="col-12 text-center q-pt-md">
        <q-btn color="dark" push
          icon="flag" large
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
import Snowf from 'vue-snowf'
export default {
  name: 'PageIndex',
  components: { Snowf },
  methods: {
    start () {
      this.$router.push('/raffle')
    }
  }
}
</script>
