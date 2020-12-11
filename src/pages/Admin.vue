<template>
  <q-page class="flex flex-center" style="padding-top: 150px;">
    <div class="container q-ml-lg q-mr-lg">
      <div class="row">
        <div class="col-12">
          <q-card class="card-border-primary">
            <q-card-section>
              <div class="text-h3 text-center text-weight-thin">UPLOAD EMPLOYEE (EXCEL) FILE</div>
            </q-card-section>
            <q-card-section>
              <div>
                <input
                  type="file"
                  @change="excelExport"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
              </div>
            </q-card-section>
            <q-card-actions class="row items-start q-gutter-md justify-center">
              <q-btn push color="primary" @click="saveEmployees()">UPLOAD TO DATABASE</q-btn>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-12">
          <q-table
            title="Raffle Winners"
            :data="setAllWinners"
            :columns="columns"
            color="primary"
            row-key="name"
          >
            <template v-slot:top-right>
              <q-btn
                color="primary"
                icon-right="archive"
                label="Export to csv"
                no-caps
                @click="exportTable"
              />
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import XLSX from 'xlsx'
import { exportFile } from 'quasar'
import { mapGetters } from 'vuex'

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
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export default {
  data () {
    return {
      excelData: [],
      columns: [
        {
          name: 'employee_code',
          required: true,
          label: 'Employee ID',
          align: 'left',
          field: row => row.employee_code,
          sortable: true
        },
        { name: 'full_name', align: 'center', label: 'Full Name', field: 'full_name' },
        { name: 'department', label: 'Department', field: 'department' },
        { name: 'position', label: 'Position', field: 'position' },
        { name: 'category', label: 'Category', field: 'category' },
        { name: 'raffle_price', label: 'Prize', field: 'raffle_price' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'raffleDetails',
      'currentWinners',
      'winnersStatus',
      'duration',
      'setAllWinners'
    ])
  },
  created () {
    this.getWinners()
  },
  methods: {
    async getWinners () {
      await this.$store.dispatch('getAllWinners')
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
    excelExport (event) {
      var input = event.target
      var reader = new FileReader()
      reader.onload = () => {
        var fileData = reader.result
        var wb = XLSX.read(fileData, { type: 'binary' })
        wb.SheetNames.forEach((sheetName) => {
          var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
          this.excelData = rowObj
        })
      }
      reader.readAsBinaryString(input.files[0])
    },
    async saveEmployees () {
      await this.$store.dispatch('saveEmployees', this.excelData)
    }
  }
}
</script>
