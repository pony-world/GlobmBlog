<template>
  <div class="header-container">
    <header ref="header" :class="fixed ? 'fixed' : ''">
      <div class="header-box" :class="[showTitle ? 'default-hide' : 'default-show', navAll ? 'show-all' : '']">
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
                <router-link to="/" active-class="active" exact>首页</router-link>
              </li>
              <li>
                <router-link to="/tool" active-class="active">工具</router-link>
              </li>
              <li>
                <router-link to="/blog" active-class="active">博客</router-link>
              </li>
<!--              <li>-->
<!--                <router-link to="/doc" active-class="active">文档</router-link>-->
<!--              </li>-->
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
      <div class="title" :class="showTitle ? 'title-show' : 'title-hide'">
        <div class="title-box">
          <p>{{blogTitle}}</p>
          <div class="user">
            <div class="logo">
              <router-link :to="`/blog/${blogUser.id}`" target="_blank">
                <img :src="blogUser.avatar || require('@/assets/img/user-avatar.jpg')" alt="" @error="handleError">
              </router-link>
            </div>
            <span>{{blogUser.name}}</span>
          </div>
        </div>
      </div>
    </header>
    <div :class="fixed ? 'header-bottom-box' : ''"></div>
  </div>
</template>

<script>
import { apiGetUserIntro } from '@/api/http_url'
import HeaderAside from '@/views/system/HeaderAside'
import { getScrollTop } from '@/assets/js/util'

export default {
  name: 'HeaderList',
  data () {
    return {
      token: '',
      userIntro: {},
      fixed: false,
      navAll: false,
      blogTitle: '',
      blogUser: {},
      showTitle: false,
      scrollY: 0
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
    },
    '$route.meta.fixed': {
      handler (newVal) {
        this.fixed = !!newVal
      },
      immediate: true,
      deep: true
    },
    '$route.meta.navAll': {
      handler (newVal) {
        this.navAll = !!newVal
      },
      immediate: true,
      deep: true
    },
    '$store.state.blogTitle': {
      handler (newVal) {
        this.blogTitle = newVal
        if (newVal) {
          window.addEventListener('scroll', this.scrollTitle)
        } else {
          this.showTitle = false
          window.removeEventListener('scroll', this.scrollTitle)
        }
      },
      immediate: true,
      deep: true
    },
    '$store.state.blogUser': {
      handler (newVal) {
        if (newVal) {
          this.blogUser = newVal
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
    },
    // 文章标题滚动
    scrollTitle () {
      const scrollTop = getScrollTop()
      this.showTitle = this.scrollY < scrollTop && scrollTop >= this.$refs.header.clientHeight
      this.scrollY = scrollTop
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollTitle)
  },
  components: {
    HeaderAside
  }
}
</script>

<style lang="scss" scoped>
  .header-container{
    header{
      height: 64px;
      line-height: 64px;
      min-width: 1200px;
      background: $primary-color;
      ul{
        list-style: none;
      }
      .header-box{
        position: absolute;
        z-index: 101;
        padding: 0 24px;
        width: 1200px;
        height: 64px;
        left: calc((100% - 1200px) / 2);
        top: 0;
        transition: padding .45s cubic-bezier(.215,.61,.355,1),
        max-width .45s cubic-bezier(.215,.61,.355,1),
        width .45s cubic-bezier(.215,.61,.355,1),
        left .45s cubic-bezier(.215,.61,.355,1),
        transform .3s cubic-bezier(.215,.61,.355,1);
        &.default-show {
          transform: translateY(0);
        }
        &.default-hide {
          transform: translateY(-100%);
        }
        &.show-all{
          left: 0;
          width: 100%;
        }
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
      .title {
        position: absolute;
        z-index: 100;
        top:0;
        height: 64px;
        width: 1200px;
        overflow: hidden;
        padding: 0 24px;
        left: calc((100% - 1200px) / 2);
        &.title-show .title-box{
          transform: translateY(0);
        }
        &.title-hide .title-box{
          transform: translateY(100%);
        }
        .title-box{
          padding: 0 24px;
          max-width: 1200px;
          height: 64px;
          margin: 0 auto;
          transition: .3s cubic-bezier(.215,.61,.355,1);
          width: 100%;
          overflow: hidden;
          > p{
            float: left;
            font-size: 16px;
            color: #fff;
            font-weight: 700;
            letter-spacing: 1px;
            width: 800px;
            @include single-line-ellipsis;
          }
          .user{
            float: right;
            overflow: hidden;
            max-width: calc(100% - 900px);
            .logo{
              float: left;
              margin-right: 20px;
              padding: 12.5px 0;
              cursor: pointer;
              img{
                border-radius: 50%;
                width: 39px;
                height: 39px;
                display: block;
              }
            }
            span{
              float: left;
              color: #fff;
              max-width: calc(100% - 59px);
              @include single-line-ellipsis;
            }
          }
        }
      }
      &.fixed{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
      }
    }
    .header-bottom-box{
      height: 64px;
    }
  }
</style>
