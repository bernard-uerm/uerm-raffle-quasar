<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="row justify-center">
        <div class="col-12">
          <q-card class="card-border-primary bg-blue-10" style="height: 600px; overflow-y:auto;width:1200px;">
            <q-card-section>
              <div class="row">
                <div class="col-6 text-h3 text-weight-thin text-white text-left blink">CONGRATULATIONS</div>
                <div class="col-6 text-right">
                  <q-btn color="negative" push
                    icon="logout" large
                    @click="goBack()"
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
                  <td class="text-center" width="20%">PRIZE</td>
                </tr>
              </table>

            </q-card-section>
            <Fireworks />
            <div id="main">
              <q-card-section id="scroller"
                :style="`animation-duration: ${this.overallDuration};`"
              >
                <table class="winner-table" :border="this.tableBorder" style="border-collapse: collapse;font-size:22px;">
                  <tr
                    v-for="raffle in this.overallWinners" :key="raffle.entry_id" v-bind="raffle">
                    <td class="text-center" width="8%">{{raffle.incrementalID}}</td>
                    <td class="text-center" width="10%">{{raffle.entry_id}}</td>
                    <td class="text-center" width="20%">{{raffle.fullname}}</td>
                    <td class="text-center" width="29%">{{raffle.department}}</td>
                    <td class="text-center" width="18%">{{raffle.position}}</td>
                    <td class="text-center" width="20%">{{raffle.prize}}</td>
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
      overallDuration: null,
      tableBorder: 0,
      tada: require('../assets/sounds/tada.mp3'),
      overallWinners: []
    }
  },
  computed: {
    ...mapGetters([
      'raffleDetails',
      'currentWinners',
      'raffleWinnersByCategory',
      'duration',
      'durationPerCategory',
      'raffleStatus'
    ])
  },
  created () {
    var tadaAudio = new Audio(this.tada)
    tadaAudio.play()
    this.getFinalWinners()
  },
  methods: {
    async goBack () {
      await this.$store.dispatch('setRaffleWinnersByCategory', [])
      this.$router.push('/raffles')
    },
    async getFinalWinners () {
      await this.$store.dispatch('getCurrentWinners', this.$route.params.id)
      var uncomputeDuration = 0
      var addedDuration = null
      if (this.durationPerCategory > 0) {
        uncomputeDuration = this.durationPerCategory
        if (Number(this.durationPerCategory < 15)) {
          if (Number(this.duration > 2) && Number(this.duration < 10)) {
            addedDuration = 3
          } else {
            addedDuration = 10
          }
        } else if (Number(this.durationPerCategory >= 20) && Number(this.durationPerCategory <= 30)) {
          addedDuration = 15
        } else {
          addedDuration = 50
        }
      } else {
        uncomputeDuration = this.duration
        if (Number(this.duration < 15)) {
          if (Number(this.duration > 2) && Number(this.duration < 10)) {
            addedDuration = 3
          } else {
            addedDuration = 10
          }
        } else if (Number(this.duration >= 20) && Number(this.duration <= 30)) {
          addedDuration = 15
        } else {
          addedDuration = 50
        }
      }
      this.overallDuration = uncomputeDuration + addedDuration + 's'
      if (this.raffleStatus) {
        this.overallWinners = this.currentWinners
      } else {
        this.overallWinners = this.raffleWinnersByCategory
      }
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
#scroller {
  top: 0;
  left: 0;
  right: 0;
  animation-name: scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite
}

.winner-table {
  border-collapse: collapse;
  width: 100%;
}

.winner-table th, td {
  text-align: left;
  padding: 8px;
}

.winner-table tr:nth-child(even) {background-color: #fff; color:#0d47a1 }

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
