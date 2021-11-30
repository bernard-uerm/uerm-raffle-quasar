<template>
  <div>
    <q-card class="card-border-primary">
      <q-table
        title="Raffle Winners"
        :data="setAllWinners"
        :columns="columns"
        color="primary"
        row-key="incrementalID"
        :loading="loading"
      >
        <template v-slot:top-right>
          <q-btn-group push>
            <q-btn push
              color="primary"
              icon-right="archive"
              label="Export to CSV"
              no-caps
              @click="exportTable"
            />
            <q-btn push
              color="primary"
              icon-right="delete"
              label="Clear Winners"
              no-caps
              @click="clearWinners"
            />
          </q-btn-group>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
function wrapCsvValue (val, formatFn) {
  // eslint-disable-next-line no-void
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  // eslint-disable-next-line no-void
  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  return `"${formatted}"`
}

import { mapGetters } from 'vuex'
import { exportFile } from 'quasar'
export default {
  data () {
    return {
      loading: false,
      columns: [
        {
          name: 'entry_id',
          required: true,
          label: 'Employee ID',
          align: 'left',
          field: row => row.entry_id,
          sortable: true
        },
        { name: 'fullname', align: 'center', label: 'Full Name', field: 'fullname' },
        { name: 'department', label: 'Department', field: 'department' },
        { name: 'position', label: 'Position', field: 'position' },
        { name: 'category', label: 'Category', field: 'category' },
        { name: 'raffle_price', label: 'Prize', field: 'prize' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'setAllWinners'
    ])
  },
  created () {
    this.getWinners()
  },
  methods: {
    async getWinners () {
      this.loading = true
      await this.$store.dispatch('getAllWinners')
      this.loading = false
    },
    exportTable () {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
        this.setAllWinners.map(row => this.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            // eslint-disable-next-line no-void
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'Winners.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
    async clearWinners () {
      await this.$store.dispatch('clearWinners')
      this.getWinners()
    }
  }
}
</script>
