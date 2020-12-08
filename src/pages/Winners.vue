<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="row justify-center">
        <div class="col-12" style="margin-top: 25%">
          <q-card class="card-border-primary bg-primary" style="height: 480px; overflow-y:auto; ">
            <q-card-section>
              <div class="text-h3 text-weight-thin text-white text-center"> WINNERS </div>
            </q-card-section>
            <Fireworks />
            <div id="main">
              <q-card-section id="scroller">
                  <table border="1" style="border-collapse: collapse;font-size:22PX;">
                    <tr
                      v-for="raffle in this.winners"
                      :key="raffle.ROWNUMBER"
                      v-bind="raffle">
                      <td class="text-center">{{raffle.ROWNUMBER}}</td>
                      <td class="text-center">{{raffle.NAME}}</td>
                      <td class="text-center">COM-EDUCATIONAL MEASUREMENT & BOARD REVIEW COURSES</td>
                      <td class="text-center">OIC-Parking Mgt. and Infectious Waste Disposal</td>
                    </tr>
                  </table>
              </q-card-section>
            </div>
          </q-card>
        </div>
      </div>
      <div class="row justify-center q-pt-lg">
        <q-btn color="primary" push
          icon="logout" large
          :to="'/raffles'"
        >
          <div class="q-pl-sm">BACK</div>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import Fireworks from 'components/Fireworks.vue'
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
  created () {
    console.log(this.$route.params.id)
  }
}
</script>

<style scoped>

#main {
  width: 100%;
  padding-top: 42%;
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
