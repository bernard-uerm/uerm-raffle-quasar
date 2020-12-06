<template>
  <div>
    sfdjsaf
  </div>
</template>

<script>
export default {
  methods: {
    async getCategories () {
      await this.$store.dispatch('getCategories')
    }
  },
  mounted () {
    this.getCategories()
  }
}
</script>
