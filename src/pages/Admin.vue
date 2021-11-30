<template>
  <q-page class="flex flex-center" style="padding-top: 150px;">
    <div class="container q-ml-lg q-mr-lg">
      <div class="row q-pa-md">
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
      </div>
      <div class="row q-pa-md">
        <div class="col-12">
          <excel-export />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import XLSX from 'xlsx'
import { mapGetters } from 'vuex'
import ExcelExport from 'src/components/ExcelExport.vue'
export default {
  name: 'AdminConfiguration',
  components: { ExcelExport },
  data () {
    return {
      excelData: [],
      excelFormat: null,
      excelFormatParsed: null,
      employeeList: []
    }
  },
  computed: {
    ...mapGetters([
      'raffleDetails',
      'currentWinners',
      'winnersStatus',
      'duration'
    ])
  },
  watch: {
    excelFormatParsed (val) {
      // var sentLinks = []
      // var unsentLinks = []
      // console.log(sentLinks)
      this.employeeList = val
    }
  },
  methods: {
    // excelExport (event) {
    //   var input = event.target
    //   var reader = new FileReader()
    //   reader.onload = () => {
    //     var fileData = reader.result
    //     var wb = XLSX.read(fileData, { type: 'binary' })
    //     wb.SheetNames.forEach((sheetName) => {
    //       var rowObj = XLSX.utils.sheet_to_json(wb.Sheets.Sheet1)
    //       this.excelData = rowObj
    //     })
    //   }
    //   reader.readAsBinaryString(input.files[0])
    // },
    excelExport (val) {
      this.excelFormatParsed = null
      this.excelEmailMessage = []
      var input = event.target
      var reader = new FileReader()
      reader.readAsBinaryString(input.files[0])
      reader.onload = () => {
        var fileData = reader.result
        var wb = XLSX.read(fileData, { type: 'binary' })
        wb.SheetNames.forEach((sheetName) => {
          var rowObj = XLSX.utils.sheet_to_json(wb.Sheets.Sheet1)
          this.excelFormatParsed = rowObj
        })
      }
      setTimeout(() => {
        this.excelEmailFormat = []
        this.excelEmailFormatLoading = false
        this.showParsedEmailData = true
      }, 3000)
    },
    async saveEmployees () {
      await this.$store.dispatch('saveEmployees', this.employeeList)
    }
  }
}
</script>
