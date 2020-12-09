<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="row justify-center">
        <div class="col-12" style="margin-top: 25%">
          <q-card class="card-border-primary bg-primary" style="height: 470px; overflow-y:auto; ">
            <q-card-section>
              <div class="row">
                <div class="col-6 text-h3 text-weight-thin text-white text-left">WINNERS</div>
                <div class="col-6 text-right">
                  <q-btn color="negative" push
                    icon="logout" large
                    :to="'/raffles'"
                  >
                    <div class="q-pl-sm">BACK</div>
                  </q-btn>
                </div>
              </div>

            </q-card-section>
            <Fireworks />
            <div id="main">
              <q-card-section id="scroller">
                  <table border="1" style="border-collapse: collapse;font-size:22PX;">
                    <tr
                      v-for="raffle in this.finalWinners"
                      :key="raffle.employee_code"
                      v-bind="raffle">
                      <td class="text-center"></td>
                      <td class="text-center">{{raffle.full_name}} </td>
                      <td class="text-center">{{raffle.department}}</td>
                      <td class="text-center">{{raffle.position}}</td>
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
      winners: employees
    }
  },
  computed: {
    ...mapGetters([
      'raffleDetails',
      'finalWinners'
    ])
  },
  created () {
    this.getFinalWinners()
    console.log(this.$route.params.id)
  },
  methods: {
    async getFinalWinners () {
      const raffleWinnersInfo = {
        raffleID: this.raffleDetails.raffleID,
        categoryID: this.$route.params.id
      }
      await this.$store.dispatch('getFinalWinners', raffleWinnersInfo)
    }
  }
}
</script>

<style scoped>

#main {
  width: 100%;
  padding-top: 43%;
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
  width: 900px;
  /*animation: scroll 10s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite*/
  animation: scroll 300s linear infinite
}

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
</style>
