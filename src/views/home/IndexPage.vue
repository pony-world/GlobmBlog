<template>
  <main>
    <banner-list/>
    <trait-list/>
    <StickyList/>
  </main>
</template>

<script>
import BannerList from '@/views/home/BannerList'
import TraitList from '@/views/home/TraitList'
import StickyList from '@/views/home/StickyList'

export default {
  created () {
    document.title = 'Globm Blog'
  },
  components: {
    BannerList,
    TraitList,
    StickyList
  }
}
</script>

<style lang="scss" scoped>
  main {
    background: #fff;
  }
</style>
