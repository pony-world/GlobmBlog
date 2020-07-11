<template>
  <main>
    <div class="main-wrapper"></div>
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {}
  },
  created () {
    document.title = '工具' + '_Globm Blog'
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  main{
    .main-wrapper{
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
