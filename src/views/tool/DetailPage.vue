<template>
  <main>
    <div class="blog-list blog-list-null">
      <i class="ico icon-null-null"></i>
      <p>开发中，请耐心等待···</p>
    </div>
  </main>
</template>

<script>
export default {
  name: 'DetailPage',
  data () {
    return {}
  },
  created () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  main{
    .blog-list-null{
      text-align: center;
      padding: 180px 0;
      i{
        font-size: 200px;
        color: $primary-color;
      }
      p{
        margin-top: 12px;
        font-weight: bold;
        color: #595959;
        font-size: 15px;
        letter-spacing: 2px;
      }
    }
  }
</style>
