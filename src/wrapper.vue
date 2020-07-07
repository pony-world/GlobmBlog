<template>
  <div id="wrapper">
    <div  v-if="showWrapper && created">
      <header-list/>
      <div class="router-view" id="main-wrapper">
        <router-view/>
      </div>
      <footer-list/>
    </div>
    <div v-if="!showWrapper && created">
      <IssuePage/>
    </div>
  </div>
</template>
<script>
import HeaderList from '@/views/system/HeaderList'
import FooterList from '@/views/system/FooterList'
import IssuePage from '@/views/user/blog/IssuePage'

export default {
  data () {
    return {
      showWrapper: true,
      created: false
    }
  },
  watch: {
    '$route.path': {
      handler (newVal) {
        this.showWrapper = newVal !== '/user/blog/issue'
        this.created = true
      },
      immediate: false
    }
  },
  components: {
    HeaderList,
    FooterList,
    IssuePage
  }
}
</script>
<style lang="scss">
  #wrapper {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    font-size: 14px;
    color: #2c3e50;
  }
  .router-view{
    background: #f5f6f7;
    min-height: calc(100vh - 64px);
  }
</style>
