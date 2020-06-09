<template>
  <footer>
    <div class="footer-box">
      <p>
        Copyright © Globm Blog | 备案号:
        <a rel="nofollow" href="http://www.beian.miit.gov.cn" target="_blank">津ICP备19009993号-1</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterList',
  data () {
    return {}
  },
  created () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  footer{
    background: #404040;
    .footer-box{
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      height: 64px;
      line-height: 64px;
      p{
        color: rgba(255, 255, 255, 0.7);
        letter-spacing: 1px;
        font-size: 12px;
        a{
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
</style>
