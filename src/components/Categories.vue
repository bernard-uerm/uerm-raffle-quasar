<template>
  <div>
    <q-card class="my-card text-white card-border-primary">
      <q-card-section>
        <div class="text-h1 text-weight-thin text-primary">
          {{this.raffleName}}
        </div>
      </q-card-section>
      <q-card-section>
        <q-select
          dense
          ref="categories"
          v-model="drawCategories"
          use-input
          hide-selected
          fill-input
          label="Categories"
          input-debounce="0"
          :options="drawCategoriesOptions"
          @filter="filterCategories"
          behavior="dialog"
          style="padding-bottom: 15px"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please enter the Category']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-card-section>
        <q-input type="number" label="Enter Number of Winners" v-model="drawNumbers"></q-input>
      </q-card-section>
      <q-card-actions class="row items-start q-gutter-md justify-center">
        <q-btn-group push>
          <q-btn push
            @click="draw()"
            color="primary"
            class="text-white"
            icon="book_online"
            large
          >
            DRAW
          </q-btn>
          <q-btn v-show="hasWinners && drawCategories != null"
            push
            @click="getWinners()"
            color="secondary"
            class="text-white"
            icon="emoji_events"
            large
          >
            WINNERS
          </q-btn>
          <q-btn push
            :to="'/raffles'"
            color="negative"
            class="text-white"
            icon="logout"
            large
          >
            BACK
          </q-btn>
        </q-btn-group>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: [
    'raffleName'
  ],
  data () {
    return {
      drawCategories: null,
      drawCategoriesOptions: null,
      drawNumbers: null,
      hasWinners: true
    }
  },
  computed: {
    ...mapGetters([
      'categories'
    ])
  },
  methods: {
    async getCategories () {
      await this.$store.dispatch('getCategories')
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
    async draw () {
      console.log('here')
    },
    async getWinners () {
      this.$router.push('/winners/' + this.drawCategories)
    }
  },
  mounted () {
    this.getCategories()
  }
}
</script>
