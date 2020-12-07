<template>
  <q-page class="flex flex-center">
    <div class="container">
      <div class="row justify-center">
        <div class="col-12">
          <div class="text-h1 text-font-weight-thin text-center">WINNERS OF 500</div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-8">
          <q-card class="card-border-primary bg-primary" style="height: 500px; overflow-y:auto;">
            <div id="main">
              <q-card-section id="scroller">
                  <div>
                    <article style="margin-bottom: 5em">
                      <dl
                        v-for="raffle in this.winners"
                        :key="raffle.ROWNUMBER"
                        v-bind="raffle"
                      >
                        <dt>{{raffle.ROWNUMBER}}</dt>
                        <dd>{{raffle.NAME}}</dd>
                      </dl>
                    </article>
                  </div>
              </q-card-section>
            </div>
          </q-card>
        </div>
        <!-- <q-card
          class=""
          v-for="raffle in this.winners"
          :key="raffle.ROWNUMBER"
          v-bind="raffle"
        >
          <q-card-section>
            <small class="text-primary">{{raffle.CODE}}</small>
          </q-card-section>
        </q-card> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import employees from 'components/employees.json'
export default {
  data () {
    return {
      winners: employees
    }
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

/* Sections */
section {
  position: relative;
  padding-top: 42%;
}

section:last-child {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
}

/* List */
dl {
  font-size: .6em;
  line-height: 1.5;
}

dl:after {
  content: '';
  display: table;
  clear: both;
}

dt,
dd {
  float: left;
  width: 50%;
  box-sizing: border-box;
}

dt {
  text-align: right;
  padding-right: 10px;
}

dd {
  margin: 0;
  padding-left: 10px;
  text-align: left;
  text-transform: uppercase;
  color: #FED636;
  color: var(--yellow, #FED636);
}

/* Typography */
h3,
p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backface-visibility: hidden;
}

h2 {
  font-weight: 400;
  font-size: .8em;
  text-align: center;
  margin-bottom: 1em;
}

h3 {
  font-weight: 400;
  font-size: .8em;
}

p {
  font-weight: 400;
  color: #FED636;
  color: var(--yellow, #FED636);
}

span {
  text-transform: uppercase;
  color: #FFFFFF;
  color: var(--white, #FFFFFF);
}

b {
  font-weight: 700;
}

</style>
