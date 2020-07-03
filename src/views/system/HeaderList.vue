<template>
  <header>
    <div class="header-box">
      <div class="logo">
        <router-link to="/redirect">
          <img src="../../assets/img/logo.png" alt="">
          <span>GLOBM</span>
        </router-link>
      </div>
      <div class="menu-box">
        <div class="menu">
          <ul class="nav">
            <li>
              <router-link to="/index" active-class="active" exact>首页</router-link>
            </li>
<!--            <li>-->
<!--              <router-link to="/tool" active-class="active">工具</router-link>-->
<!--            </li>-->
            <li>
              <router-link to="/blog" active-class="active">博客</router-link>
            </li>
<!--            <li>-->
<!--              <router-link to="/ui" active-class="active">组件</router-link>-->
<!--            </li>-->
          </ul>
          <a href="https://github.com/pony-world/GlobmBlog" target="_blank" class="btn">
            Github
          </a>
          <router-link v-if="!token" to="/login" class="btn">Sign In</router-link>
          <div v-else class="user-avatar">
            <img :src="userIntro.avatar || require('@/assets/img/user-avatar.jpg')" alt="" @error="handleError">
            <HeaderAside :intro="userIntro"/>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { apiGetUserIntro } from '@/api/http_url'
import HeaderAside from '@/views/system/HeaderAside'

export default {
  name: 'HeaderList',
  data () {
    return {
      token: '',
      userIntro: {}
    }
  },
  watch: {
    '$store.getters.token': {
      handler (newVal) {
        this.token = newVal
        if (newVal) {
          this.getUserIntro()
        }
      },
      immediate: true
    },
    '$store.state.userIntro': {
      handler (newVal) {
        if (newVal && newVal.constructor === Object) {
          this.userIntro = newVal
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getUserIntro () {
      apiGetUserIntro().then(res => {
        this.$store.dispatch('SET_USER_INTRO', res)
      })
    },
    handleError (e) {
      e.target.src = require('@/assets/img/user-avatar.jpg')
    }
  },
  components: {
    HeaderAside
  }
}
</script>

<style lang="scss" scoped>
  header{
    height: 64px;
    line-height: 64px;
    background: $primary-color;
    /*box-shadow: 0 4px 12px rgba(138,166,195,.45);*/
    transition: box-shadow .45s cubic-bezier(.215,.61,.355,1);
    ul{
      list-style: none;
    }
    .header-box{
      padding: 0 24px;
      max-width: 1200px;
      height: 64px;
      margin: 0 auto;
      transition: padding .45s cubic-bezier(.215,.61,.355,1),max-width .45s cubic-bezier(.215,.61,.355,1);
      .logo{
        float: left;
        a{
          color: #fff;
          display: block;
          img{
            width: 28px;
            height: 28px;
            margin: 18px 8px 0 0;
            display: block;
            float: left;
          }
          span{
            font-size: 16px;
          }
        }
      }
      .menu-box{
        float: right;
        .menu{
          color: #fff;
          @include clear-box;
          .nav{
            float: left;
            overflow: hidden;
            li{
              float: left;
              a{
                display: block;
                padding: 0 20px;
                color: #fff;
                position: relative;
                &.active:before,&:hover:before{
                  content: '';
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 100%;
                  height: 2px;
                  background-color: #fff;
                }
              }
            }
          }
          .btn{
            float: left;
            border: 1px solid #fff;
            border-radius: 28px;
            height: 28px;
            line-height: 28px;
            color: #fff;
            padding: 0 16px;
            margin-left: 20px;
            margin-top: 16px;
            cursor: pointer;
            box-sizing: content-box;
          }
          .user-avatar{
            float: left;
            margin-left: 20px;
            padding: 12.5px 0;
            cursor: pointer;
            position: relative;
            &:hover{
              /deep/.user-control{
                display: block;
              }
            }
            >img{
              border-radius: 50%;
              width: 39px;
              height: 39px;
              display: block;
            }
          }
        }
      }
    }
  }
</style>
