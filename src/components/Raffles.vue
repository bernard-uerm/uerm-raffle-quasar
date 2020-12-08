<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md justify-center">
      <q-card
        class="card-raffle text-white card-border-primary relative-position"
        v-for="raffle in raffles"
        :key="raffle.name"
        v-bind="raffle"
      >
        <div></div>
        <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
          <div v-show="showCard">
            <q-card-section>
              <div class="text-h6 text-weight-thin text-primary">{{raffle.name}}</div>
            </q-card-section>
            <q-card-actions class="row items-start q-gutter-md justify-center">
              <q-btn
                @click="drawRaffle(raffle.id)"
                color="primary"
                icon="check"
                large
              >
                START
              </q-btn>
            </q-card-actions>
          </div>
        </transition>
        <q-inner-loading :showing="showLoading">
          <q-spinner-cube size="xl" color="primary" />
        </q-inner-loading>
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
  data () {
    return {
      showCard: false,
      showLoading: false
    }
  },
  methods: {
    cardLoading () {
      this.showLoading = true
      setTimeout(() => {
        this.showLoading = false
        this.showCard = false
        this.showCard = true
      }, 3000)
    },
    async getRaffles () {
      await this.$store.dispatch('getRaffles')
    },
    drawRaffle (raffle) {
      this.$router.push('/raffle-draw/' + raffle)
    }
  },
  mounted () {
    this.getRaffles()
    this.cardLoading()
  },
  computed: {
    ...mapGetters([
      'raffles'
    ])
  }
}
</script>

<style lang="sass" scoped>
.card-raffle
  width: 288px
  height: 150px
</style>
