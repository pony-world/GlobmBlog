<template>
  <main>
    <div class="main-wrapper">
      <div class="aside-box">
        <router-link to="/user/blog/issue" class="router-link-btn">Marketdown编辑器</router-link>
        <el-menu
          background-color="#fff"
          text-color="#2c3e50"
          active-text-color="#2F54EB"
          :default-active="activeRouter"
          menu-trigger="click"
          :unique-opened="true"
          :router="false">
          <template v-for="(item, index) in asideMenu">
            <el-menu-item class="menu-item"
                          v-if="!item.children"
                          :index="item.url"
                          :key="index">
            <router-link :to="item.url" slot="title" class="menu-title menu-title-first">
              <i :class="item.icon_url"></i>
              {{item.menu_name}}
            </router-link>
            </el-menu-item>
            <el-submenu v-else
                        :index="item.url"
                        :key="index"
            >
            <span slot="title" class="menu-title">
              <i :class="item.icon_url"></i>
              {{item.menu_name}}
            </span>
              <el-menu-item
                class="menu-item"
                v-for="(sub_item, sub_index) in computeChildren(item.children, false)"
                :index="sub_item.url"
                :key="sub_index + '#'"
              >
                <router-link :to="sub_item.url" slot="title" class="menu-title menu-title-second">
                  {{sub_item.menu_name}}
                </router-link>
              </el-menu-item>
              <el-submenu
                class="menu-item"
                v-for="(sub_item, sub_index) in computeChildren(item.children, true)"
                :index="sub_item.url"
                :key="sub_index + '&'"
              >
                <span slot="title" class="menu-title">{{sub_item.menu_name}}</span>
                <el-menu-item class="menu-item"
                              v-for="(last_item,last_index) in sub_item.children"
                              :index="last_item.url"
                              :key="last_index">
                  <router-link :to="last_item.url" slot="title" class="menu-title menu-title-third">
                    {{last_item.menu_name}}
                  </router-link>
                </el-menu-item>
              </el-submenu>
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <div class="main-box">
        <router-view/>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      asideMenu: [
        {
          menu_name: '个人资料',
          url: '/user/intro',
          icon_url: 'el-icon-user-solid'
        },
        {
          menu_name: '博客管理',
          url: '/user/blog',
          icon_url: 'el-icon-s-management',
          children: [
            {
              menu_name: '文章管理',
              url: '/user/blog/article'
            },
            {
              menu_name: '评论管理',
              url: '/user/blog/comment'
            },
            {
              menu_name: '分类专栏',
              url: '/user/blog/type'
            },
            {
              menu_name: '博客搬家',
              url: '/user/blog/move'
            }
          ]
        }
      ]
    }
  },
  watch: {
    '$store.getters.token': {
      handler (newVal) {
        if (!newVal) {
          this.$router.replace('/login?path=' + this.$route.fullPath)
          this.$notice('请先登录')
        }
      },
      immediate: true
    }
  },
  computed: {
    activeRouter () {
      if (Object.keys(this.$route.params).length > 0) {
        const arr = Object.keys(this.$route.params)
        let path = this.$route.meta.active
        arr.forEach(item => {
          path = path.replace(item, this.$route.params[item])
        })
        return path
      } else {
        return this.$route.meta.active || this.$route.path
      }
    }
  },
  created () {
    document.title = '用户中心' + '_Globm Blog'
  },
  methods: {
    computeChildren (arr, type) {
      return arr.filter(item => !item.children === !type)
    },
    handleRoute (url) {
      const { path, fullPath } = this.$route
      if (path === url) {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      } else {
        this.$router.push(url)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  main{
    .main-wrapper{
      width: $max-width;
      margin: 0 auto;
      padding: 8px 0 50px;
      overflow: hidden;
      .aside-box{
        float: left;
        width: 180px;
        border-right: 1px solid #e9e9e9;
        background: #fff;
        overflow: hidden;
        min-height: calc(100vh - 64px - 16px);
        .router-link-btn{
          display: block;
          background-color: $primary-color;
          color: #fff;
          margin: 16px auto;
          width: 148px;
          height: 40px;
          text-align: center;
          border-radius: 23px;
          line-height: 40px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          user-select: none;
        }
        /deep/.el-menu{
          border: none;
          span{
            display: block;
            user-select: none;
            i{
              line-height: 56px;
              vertical-align: top;
            }
          }
          .menu-title{
            display: block;
            user-select: none;
            color: rgb(44, 62, 80);
            i{
              line-height: 56px;
              vertical-align: top;
            }
          }
          .menu-title-first{
            padding: 0 20px;
          }
          .menu-title-second{
            padding: 0 20px 0 40px;
          }
          .menu-title-third{
            padding: 0 20px 0 60px;
          }
          .el-menu-item{
            padding: 0!important;
          }
          .el-menu-item:focus,
          .el-menu-item:hover,
          .menu-item:focus,
          .menu-item:hover,
          .el-menu-item.is-active,
          .el-submenu__title:hover{
            background-color: rgba(47, 84, 235, 0.09) !important;
            color: $primary-color !important;
            .menu-title{
              color: $primary-color;
              i{
                color: $primary-color;
              }
            }
          }
          .el-menu-item.is-active, .el-menu-item:hover{
            background: rgba(47, 84, 235, 0.09) !important;
            position: relative;
            &:after{
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              width: 2px;
              height: 100%;
              background: $primary-color;
            }
          }
          .el-submenu__title{
            border-top: solid 1px #efefef;
          }
        }
      }
      .main-box{
        float: left;
        width: calc(100% - 180px);
        background: #fff;
        padding: 30px 20px;
        min-height: calc(100vh - 64px - 16px);
      }
    }
  }
</style>
