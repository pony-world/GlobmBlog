<template>
  <main>
    <!--  分类Tabs  -->
<!--    <el-tabs v-model="activeName">-->
<!--      <el-tab-pane label="全部" name="first"></el-tab-pane>-->
<!--    </el-tabs>-->
    <!--  工具列表  -->
    <div class="tool-wrapper">
      <!--   工具盒子   -->
      <div class="tool-container" v-for="(item, ins) in toolList" :key="ins">
        <!--    header    -->
        <div class="item-hd">
          <router-link :to="`/tool/${item.flag}`" class="logo">
            <img :src="item.logo" alt="">
          </router-link>
          <div class="title">
            <h3>
              <router-link :to="`/tool/${item.flag}`">{{item.title}}</router-link>
            </h3>
            <p>
              <span>[开发类]</span>
            </p>
          </div>
        </div>
        <!--    body    -->
        <div class="item-bd" :title="item.desc">{{item.desc}}</div>
        <!--    footer    -->
        <div class="item-ft">
          <router-link :to="`/tool/${item.flag}`" class="link">{{`${getLocation()}/${item.flag}`}}</router-link>
          <router-link :to="`/tool/${item.flag}`" class="btn">进入</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      activeName: 'first',
      toolList: [
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: '在线运行代码',
          flag: 'js',
          desc: '在线运行php,c,c++,go,python,java,groo...'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'javascript工具',
          flag: 'js',
          desc: '在线js美化、解压缩、混淆'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'css工具',
          flag: 'js',
          desc: '在线css美化、格式化、压缩'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'php工具',
          flag: 'js',
          desc: '在线php美化、格式化、解密'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'json工具',
          flag: 'js',
          desc: '在线编辑json，语法检查，转php,go类'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'sql工具',
          flag: 'js',
          desc: 'sql在线美化，格式化，压缩'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: '正则测试工具',
          flag: 'js',
          desc: '正则表达式测试工具，还可以生成代码哦'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'html工具',
          flag: 'js',
          desc: '在线html美化、格式化、压缩'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'xml工具',
          flag: 'js',
          desc: 'xml格式化、压缩'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'asciidoc编辑器',
          flag: 'js',
          desc: 'asciidoc编辑器'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'favicon在线制作',
          flag: 'js',
          desc: 'icon在线制作'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: '颜色转换',
          flag: 'js',
          desc: '颜色空间转换'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'crontab时间计算',
          flag: 'js',
          desc: 'crontab测试，执行时间计算'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'python工具',
          flag: 'js',
          desc: 'pyc文件反编译,python美化、格式化'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'ruby工具',
          flag: 'js',
          desc: 'ruby代码在线美化'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: '图片base64编码',
          flag: 'js',
          desc: '图片base64编码'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: 'markdown编辑器',
          flag: 'js',
          desc: 'markdown编辑器'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: '占位图片',
          flag: 'js',
          desc: '占位图片、前端占位图片'
        },
        {
          logo: 'http://image.springup9.com/image/20200814/1ub78n6fmkwvqqj48ow.jpeg',
          title: '进制转换',
          flag: 'js',
          desc: '常用进制转换工具'
        }
      ]
    }
  },
  created () {
    document.title = '工具' + '_Globm Blog'
  },
  methods: {
    getLocation () {
      return window.location || window.location.href
    }
  }
}
</script>

<style lang="scss" scoped>
  main{
    width: 1200px;
    margin: 0 auto;
    /* 工具列表 */
    .tool-wrapper{
      margin: 30px 0;
      display: flex;
      flex-wrap: wrap;
      /* 工具盒子 */
      .tool-container{
        width: calc((100% - 36px) / 4);
        padding: 10px 12px;
        border: 1px solid rgba(47, 84, 235, 0.2);
        border-radius: 5px;
        margin-right: 12px;
        margin-bottom: 12px;
        background: white;
        &:nth-child(4n){
          margin-right: 0;
        }
        &:hover{
          border-color: $primary-hover-color;
          box-shadow: 0 0 3px rgba(47, 84, 235, 0.43);
        }
        .item-hd{
          display: flex;
          .logo{
            width: 50px;
            height: 50px;
            img{
              display: block;
            }
          }
          .title{
            flex: 1;
            h3{
              @include single-line-ellipsis;
              font-size: 15px;
              font-weight: 700;
              line-height: 22px;
              margin-bottom: 5px;
              height: 22px;
              a{
                color: #444;
                &:hover{
                  color: $primary-color;
                }
              }
            }
            p{
              font-size: 12px;
              text-align: right;
              line-height: 23px;
            }
          }
        }
        .item-bd{
          border-top: 1px solid #f0f2f5;
          margin-top: 8px;
          line-height: 40px;
          font-size: 13px;
          @include single-line-ellipsis;
        }
        .item-ft{
          display: flex;
          font-size: 12px;
          .link{
            flex: 1;
            color: #999;
            line-height: 23px;
            @include single-line-ellipsis;
          }
          .btn{
            width: 40px;
            text-align: center;
            color: #333;
            line-height: 15px;
            padding: 3px 0;
            position: relative;
            &:before{
              content: '';
              position: absolute;
              transition: all .2s ease-in-out;
              left: 50%;
              right: 50%;
              bottom: 0;
              border-bottom: 2px solid $primary-color;
            }
            &:hover:before{
              left: 0;
              right: 0;
              border-bottom-color: $primary-color;
            }
          }
        }
      }
    }
  }
</style>
