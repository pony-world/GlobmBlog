<template>
  <div class="user-control">
    <ul>
      <li>
        <router-link to="/user/intro">
          <i class="el-icon-user-solid"></i>个人资料
        </router-link>
      </li>
    </ul>
    <ul>
      <li>
        <router-link :to="`/blog/${userIntro.id}`">
          <i class="el-icon-s-claim"></i>我的博客
        </router-link>
      </li>
      <li>
        <router-link to="/user/blog/article">
          <i class="el-icon-s-management"></i>管理博客
        </router-link>
      </li>
      <li>
        <router-link to="/user/blog/issue">
          <i class="el-icon-s-promotion"></i>发布博客
        </router-link>
      </li>
    </ul>
    <ul>
      <li>
        <a href="javascript:void(0)" @click.prevent="singOut">
          <i class="ico icon-sign-out"></i>退出
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HeaderAside',
  data () {
    return {
      userIntro: this.intro
    }
  },
  props: {
    intro: Object
  },
  watch: {
    intro: {
      handler (newVal) {
        this.userIntro = newVal
      },
      deep: true
    }
  },
  methods: {
    singOut () {
      this.$store.dispatch('REMOVE_TOKEN')
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-control{
    display: none;
    cursor: default;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 100;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.1);
    width: auto;
    padding-bottom: 8px;
    line-height: 1.5em;
    color: #333333;
    ul{
      padding: 8px 0;
      border-bottom: 1px solid #E8E8ED;
      &:last-child{
        border-color: transparent;
      }
      li{
        list-style: none;
        white-space: nowrap;
        a{
          display: block;
          padding: 0 28px 0 24px;
          line-height: 36px;
          text-align: left;
          font-size: 14px;
          color: #5b5c64;
          font-weight: 400;
          &:hover{
            background: #F0F0F5;
            color: $primary-color;
            i{
              color: $primary-color;
            }
          }
          i{
            font-size: 16px;
            margin-right: 8px;
            vertical-align: middle;
            color: #5b5c64;
          }
        }
      }
    }
  }
</style>
