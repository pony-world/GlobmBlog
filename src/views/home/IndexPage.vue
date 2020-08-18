<template>
  <main>
    <banner-list/>
    <trait-list/>
    <StickyList/>
    <FooterList/>
  </main>
</template>

<script>
import { BannerList, TraitList, StickyList, FooterList } from './components'

export default {
  created () {
    document.title = 'Globm Blog'
  },
  components: {
    BannerList,
    TraitList,
    StickyList,
    FooterList
  }
}
</script>

<style lang="scss" scoped>
  main {
    background: #fff;
  }
</style>
