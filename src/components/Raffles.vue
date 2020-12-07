<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md justify-center">
      <q-card
        class="my-card text-white card-border-primary"
        v-for="raffle in raffles"
        :key="raffle.name"
        v-bind="raffle"
      >
        <q-card-section>
          <div class="text-h6 text-weight-thin text-primary">{{raffle.name}}</div>
        </q-card-section>
        <q-card-actions class="row items-start q-gutter-md justify-center">
          <q-btn
            @click="drawRaffle(raffle.id)"
            color="primary"
            icon="flag"
            large
          >
            START
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-md row items-start q-gutter-md justify-center">
      <div class="col-12 text-center q-pt-md">
        <q-btn color="primary" push
          icon="logout" large
          :to="'/'"
        >
          <div class="q-pl-sm">BACK</div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    async getRaffles () {
      await this.$store.dispatch('getRaffles')
    },
    drawRaffle (raffle) {
      this.$router.push('/raffle-draw/' + raffle)
    }
  },
  mounted () {
    this.getRaffles()
  },
  computed: {
    ...mapGetters([
      'raffles'
    ])
  }
}
</script>
