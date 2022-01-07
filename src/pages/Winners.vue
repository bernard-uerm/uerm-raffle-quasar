<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="row justify-center">
        <div class="col-12" style="margin-top: 15%">
          <q-card class="card-border-primary bg-primary" style="height: 470px; overflow-y:auto; ">
            <q-card-section>
              <div class="row">
                <div class="col-6 text-h3 text-weight-thin text-white text-left blink">CONGRATULATIONS</div>
                <div class="col-6 text-right">
                  <q-btn color="negative" push
                    icon="logout" large
                    :to="'/raffles'"
                  >
                    <div class="q-pl-sm">BACK</div>
                  </q-btn>
                </div>
              </div>
              <table class="winner-table" :border="this.tableBorder" style="border-collapse: collapse;font-size:22px;color:white;">
                <tr>
                  <td class="text-center" width="8%">#</td>
                  <td class="text-center" width="10%">ID</td>
                  <td class="text-center" width="20%">NAME</td>
                  <td class="text-center" width="29%">DEPARTMENT</td>
                  <td class="text-center" width="18%">POSITION</td>
                  <td class="text-center" width="20%">PRICE</td>
                </tr>
              </table>

            </q-card-section>
            <Fireworks />
            <div id="main">
              <q-card-section id="scroller"
                  :style="`top: 0;
                        left: 0;
                        right: 0;
                        width: 900px;
                        animation: scroll-data-v-0361dfd8 ${this.duration} linear infinite`"
                >
                  <table class="winner-table" :border="this.tableBorder" style="border-collapse: collapse;font-size:22px;">
                    <tr
                      v-for="raffle in this.finalWinners"
                      :key="raffle.employee_code"
                      v-bind="raffle">
                      <td class="text-center" width="11%">{{raffle.incrementalID}}</td>
                      <td class="text-center" width="11%">{{raffle.employee_code}}</td>
                      <td class="text-center" width="20%">{{raffle.full_name}}</td>
                      <td class="text-center" width="20%">{{raffle.department}}</td>
                      <td class="text-center" width="20%">{{raffle.position}}</td>
                      <td class="text-center" width="20%">{{raffle.raffle_price}}</td>
                    </tr>
                  </table>
              </q-card-section>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Fireworks from 'components/Fireworks.vue'
import { mapGetters } from 'vuex'
import employees from 'components/employees.json'
export default {
  components: {
    Fireworks
  },
  data () {
    return {
      winners: employees,
      duration: null,
      tableBorder: 0,
      tada: require('../assets/sounds/tada.mp3')
    }
  },
  computed: {
    ...mapGetters([
      'raffleDetails',
      'finalWinners'
    ])
  },
  created () {
    var tadaAudio = new Audio(this.tada)
    tadaAudio.play()
    this.getFinalWinners()
  },
  methods: {
    async getFinalWinners () {
      const raffleWinnersInfo = {
        raffleID: this.raffleDetails.raffleID,
        categoryID: this.$route.params.id
      }
      await this.$store.dispatch('getFinalWinners', raffleWinnersInfo)
      this.duration = this.finalWinners.length + 30 + 's'
    }
  }
}
</script>

<style scoped>

#main {
  width: 100%;
  padding-top: 35%;
  margin: auto;
  font-size: 44px;
  font-size: calc(22px + (36 - 22) * ((100vw - 980px) / (1400 - 980)));
  color: #FFFFFF;
  color: var(--white, #FFFFFF);
  overflow: hidden;
}

@media only screen and (max-width: 980px) {
  #main {
    font-size: 22px;
  }
}

@media only screen and (min-width: 1400px) {
  #main {
    font-size: 36px;
  }
}

/* Scroller */
/* #scroller {
  top: 0;
  left: 0;
  right: 0;
  width: 900px;
  animation: scroll 300s linear infinite
} */

.winner-table {
  border-collapse: collapse;
  width: 100%;
}

.winner-table th, td {
  text-align: left;
  padding: 8px;
}

.winner-table tr:nth-child(even) {background-color: #fff; color:#1976d2}

@keyframes scroll {
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }

  2% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  95% {
    opacity: 1;
    transform: translate3d(0, -100%, 0);
  }

  100% {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }
}

.text-center {
  text-align: center !important;
}

.blink {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
