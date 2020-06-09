<template>
  <div id="wrapper" v-cloak>
    <header-list/>
    <div style="min-height: 100vh">
      <router-view/>
    </div>
    <footer-list/>
  </div>
</template>
<script>
import HeaderList from '@/views/system/HeaderList'
import FooterList from '@/views/system/FooterList'

export default {
  components: {
    HeaderList,
    FooterList
  }
}
</script>
<style lang="scss">
  #wrapper {
    [v-cloak] {
      display: none;
    }
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    font-size: 14px;
    color: #2c3e50;
  }
</style>
