<template>
  <div>
    <form>
      <q-card class="card-category text-white card-border-primary" style="overflow-y:auto;">
        <q-card-section>
          <div class="text-h3 text-weight-thin text-primary">
            Winners of {{raffleDetails.rafflePrice}}
          </div>
        </q-card-section>
        <q-card-section>
          <table class="winner-table" :border="this.tableBorder" style="border-collapse: collapse;font-size:14px;width:103%;border:1px solid #1976d2;color:#1976d2">
            <tr>
              <td class="text-center" width="5%">#</td>
              <td class="text-center" width="7%">ID</td>
              <td class="text-center" width="18%">NAME</td>
              <td class="text-center" width="26%">DEPARTMENT</td>
              <td class="text-center" width="20%">POSITION</td>
            </tr>
          </table>
        </q-card-section>
        <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
          <div v-show="showCard">
            <div v-if="showDrawCard">
              <div id="main">
                <q-card-section id="scroller"
                  :style="`top: 0;
                        left: 0;
                        right: 0;
                        width: 495px;
                        animation: scroll-data-v-0361dfd8 ${this.duration} linear infinite`"
                >
                    <table class="winner-table" :border="this.tableBorder" style="width:534px !important; border-collapse: collapse;font-size:14px; border: 1px solid #1976d2">
                      <tr
                        v-for="raffle in this.currentWinners.currentDetailedWinners"
                        :key="raffle.employee_code"
                        v-bind="raffle">
                        <td class="text-center" width="11%">{{raffle.incrementalID}}</td>
                        <td class="text-center" width="11%">{{raffle.employee_code}}</td>
                        <td class="text-center" width="20%">{{raffle.full_name}}</td>
                        <td class="text-center" width="20%">{{raffle.department}}</td>
                        <td class="text-center" width="20%">{{raffle.position}}</td>
                      </tr>
                    </table>
                </q-card-section>
              </div>
            </div>
          </div>
        </transition>
        <q-inner-loading :showing="showLoading" style="padding-top: 60px !important;">
          <q-spinner-pie size="180px" color="primary" />
          <h3 class="text-weight-thin text-blue">LOADING WINNERS</h3>
        </q-inner-loading>
      </q-card>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['raffleStatus', 'duration'],
  data () {
    return {
      drawCategories: null,
      drawCategoriesOptions: null,
      drawNumbers: null,
      showCard: false,
      showLoading: false,
      drawLoading: false,
      showDrawCard: true,
      tableBorder: 0
    }
  },
  computed: {
    ...mapGetters([
      'categories',
      'currentWinners',
      'raffleDetails'
    ])
  },
  methods: {
    cardLoading () {
      this.showLoading = true
      setTimeout(() => {
        this.showLoading = false
        this.showCard = false
        this.showCard = true
        this.setInit()
      }, 3000)
    },
    filterCategories (val, update) {
      if (val === '') {
        update(() => {
          this.drawCategoriesOptions = this.categories
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.drawCategoriesOptions = this.categories.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    async getWinners () {
      this.$router.push('/winners/' + this.drawCategories)
    }
  },
  created () {
    this.cardLoading()
  }
}
</script>

<style lang="sass" scoped>
.card-category
  width: 575px
  height: 450px
</style>

<style scoped>

#main {
  width: 100%;
  padding-top: 55%;
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
  width: 495px;
  animation: scroll-data-v-0361dfd8 300s linear infinite
} */

.winner-table {
  border-collapse: collapse;
  width: 100%;
  color: #000;
}

.winner-table th, td {
  text-align: left;
  padding: 8px;
}

.winner-table tr:nth-child(even) {background-color: #26A69A; color:#fff}

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
</style>
