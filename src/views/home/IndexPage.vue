<template>
  <main>
    <banner-list/>
    <trait-list/>
  </main>
</template>

<script>
import BannerList from '@/views/home/BannerList'
import TraitList from '@/views/home/TraitList'

export default {
  components: {
    BannerList,
    TraitList
  }
}
</script>

<style lang="scss" scoped>
  main {
    min-height: 100vh;
  }
</style>
