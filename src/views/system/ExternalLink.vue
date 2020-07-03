<template>
    <div class="ExternalLink">
      <div class="link-box">
        <h4>即将跳转到外部网站</h4>
        <p class="info">安全性未知，是否继续</p>
        <div class="link">
          <span class="icon-box">
            <i class="el-icon-link"></i>
          </span>
          <p class="link-href" :title="href">{{href}}</p>
        </div>
        <span class="btn" @click="toHref">继续前往</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ExternalLink',
  data () {
    return {
      href: this.$route.query.href
    }
  },
  created () {
    if (!this.href) {
      this.$router.push('/')
    }
    document.title = '外链跳转' + '_Globm Blog'
  },
  methods: {
    toHref () {
      window.location.href = this.href
    }
  }
}
</script>

<style lang="scss" scoped>
  .ExternalLink{
    background-color: #f5f5f5;
    padding-top: 150px;
    .link-box{
      width: 620px;
      background: #fff;
      padding: 40px;
      border-radius: 6px;
      text-align: center;
      margin: 0 auto;
      h4{
        font-size: 16px;
        letter-spacing: 1.5px;
        font-weight: normal;
        color: #000;
      }
      .info{
        font-size: 12px;
        margin-top: 8px;
        color: #969696;
      }
      .link{
        margin: 12px 80px 0;
        border-radius: 4px;
        background: #fafafa;
        border: 1px solid #C8C8C8;
        padding: 10px;
        text-align: left;
        .icon-box{
          display: inline-block;
          width: 40px;
          height: 40px;
          line-height: 40px;
          font-size: 20px;
          background: $primary-hover-color;
          border-radius: 2px;
          color: #fff;
          text-align: center;
        }
        .link-href{
          display: inline-block;
          width: calc(100% - 40px - 10px);
          font-size: 14px;
          color: $primary-hover-color;
          margin-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .btn{
        line-height: 30px;
        display: inline-block;
        margin-top: 18px;
        font-size: 12px;
        cursor: pointer;
        padding: 0 30px;
        border-radius: 15px;
        color: #969696;
        border: solid 1px #969696;
        &:hover{
          color: $primary-color;
          border-color: $primary-color;
        }
      }
    }
  }
</style>
