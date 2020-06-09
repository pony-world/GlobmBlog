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
              <router-link to="/" active-class="active" exact>首页</router-link>
            </li>
            <li>
              <router-link to="/tool" active-class="active">工具</router-link>
            </li>
            <li>
              <router-link to="/blog" active-class="active">博客</router-link>
            </li>
            <li>
              <router-link to="/ui" active-class="active">组件</router-link>
            </li>
          </ul>
          <span class="btn">Github</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderList',
  data () {
    return {}
  },
  created () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  header{
    overflow: hidden;
    height: 64px;
    line-height: 64px;
    background: #2f54eb;
    /*box-shadow: 0 4px 12px rgba(138,166,195,.45);*/
    transition: box-shadow .45s cubic-bezier(.215,.61,.355,1);
    .header-box{
      padding: 0 24px;
      max-width: 1200px;
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
            margin: 15px 8px 0 0;
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
          overflow: hidden;
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
        }
      }
    }
  }
</style>
