<template>
  <main>
    <div class="main-wrapper">
      <aside ref="aside" :class="asideFixed ? 'fixed' : ''">
        <div class="profile">
          <div class="intro">
            <router-link :to="`/blog/${userIntro.id}`" class="avatar">
              <img :src="userIntro.avatar || require('@/assets/img/user-avatar.jpg')" alt="" @error="handleError">
            </router-link>
            <div class="blog-info">
              <p class="name">{{userIntro.name}}</p>
              <p class="desc">{{userIntro.motto}}</p>
            </div>
          </div>
          <div class="data-info">
            <dl>
              <dt>{{blogSummary.original_count}}</dt>
              <dd>原创</dd>
            </dl>
            <dl>
              <dt>{{blogSummary.reprint_count}}</dt>
              <dd>转载</dd>
            </dl>
            <dl>
              <dt>{{blogSummary.comment_count}}</dt>
              <dd>评论</dd>
            </dl>
            <dl>
              <dt>{{blogSummary.view_count}}</dt>
              <dd>访问</dd>
            </dl>
          </div>
          <div class="search">
            <el-input placeholder="搜博主文章" v-model="search">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <div class="typeBlog">
          <h4>
            <i class="el-icon-s-operation"></i>
            <span>分类专栏</span>
          </h4>
          <ul>
            <li v-for="(item, ins) in blogType" :key="ins">
              <router-link :to="`/blog/${userIntro.id}?typeId=${item.id}`">
                <img :src="item.logo || require('@/assets/img/blog/blog-type.jpg')" alt="">
                <span class="type" :title="item.title">{{item.title}}</span>
                <span class="view">
                  {{item.blog.length}}篇
                </span>
              </router-link>
            </li>
          </ul>
        </div>
<!--        <div class="archiveBlog">-->
<!--          <h4>-->
<!--            <i class="el-icon-folder-opened"></i>-->
<!--            <span>归档</span>-->
<!--          </h4>-->
<!--          <div class="archive-content">-->
<!--            <div class="archive-box">-->
<!--              <div class="archive-title">2020</div>-->
<!--              <div class="archive-content">-->
<!--                <div class="archive-item">-->
<!--                  <a href="">-->
<!--                    <span class="time">5月</span>-->
<!--                    <span class="count">1篇</span>-->
<!--                  </a>-->
<!--                </div>-->
<!--                <div class="archive-item">-->
<!--                  <a href="">-->
<!--                    <span class="time">5月</span>-->
<!--                    <span class="count">1篇</span>-->
<!--                  </a>-->
<!--                </div>-->
<!--                <div class="archive-item">-->
<!--                  <a href="">-->
<!--                    <span class="time">5月</span>-->
<!--                    <span class="count">1篇</span>-->
<!--                  </a>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="hotBlog">
          <h4>
            <i class="el-icon-document"></i>
            <span>热门文章</span>
          </h4>
          <ul>
            <li v-for="(item, ins) in blogHot" :key="ins">
              <router-link :to="`/blog/${item.user_id}/detail/${item.id}`">
                {{item.title}}
                <span class="view">
                  <i class="ico icon-view"></i>
                  {{item.view}}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="hotBlog">
          <h4>
            <i class="el-icon-document"></i>
            <span>最新文章</span>
          </h4>
          <ul>
            <li v-for="(item, ins) in blogNew" :key="ins">
              <router-link :to="`/blog/${item.user_id}/detail/${item.id}`">
                {{item.title}}
                <span class="view">
                  <i class="ico icon-view"></i>
                  {{item.view}}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="group-chat">
          <h4>
            <i class="el-icon-guide"></i>
            <span>技术交流</span>
          </h4>
          <div class="chat-box">
            <img src="../../assets/img/group_qq.png" alt="">
            <div class="detail">
              <p class="intro">QQ扫码进入交流群<br/>一起探索神秘IT世界！</p>
              <p class="tel">群号：712740399</p>
            </div>
          </div>
        </div>
      </aside>
      <div class="blog-box" ref="blogBox" v-if="blogIntro.id">
        <div class="header-box">
          <h1>{{blogIntro.title}}</h1>
          <div class="info-box">
            <div class="bar-content">
              <svg class="original" width="36px" height="32px" v-if="blogIntro.title">
                <polygon points="0 0,0 32,36 26,36 6" :fill="blogIntro.is_original === 1 ? 'rgba(47,84,235,0.8)' : 'rgba(0,180,0,0.8)'"/>
                <text x="3" y="21" fill="#fff">{{blogIntro.is_original === 1 ? '原创' : '转载'}}</text>
              </svg>
              <span class="light">{{userIntro.name}}</span>
              <span><i class="ico icon-view"></i>{{blogIntro.view}}</span>
              <span>{{new Date(blogIntro.created_time).pattern("yyyy-MM-dd hh:mm:ss")}}</span>
            </div>
            <div class="bar-tag">
              <span @click="slideVisible = !slideVisible">{{slideVisible ? '收起' : '展开'}}</span>
            </div>
            <div class="bar-tag" v-if="userSelf">
              <router-link :to="`/user/blog/issue?id=${blogIntro.id}`">编辑</router-link>
            </div>
          </div>
          <el-collapse-transition>
            <div class="slide-box" v-show="slideVisible">
              <div class="tags-box">
                <div class="tags-item-box" v-if="blogIntro.tag">
                  <span class="label">博客标签：</span>
                  <router-link to="" class="tag-link" v-for="(item, ins) in blogIntro.tag.split(',')" :key="ins">
                    {{item}}
                  </router-link>
                </div>
              </div>
              <div class="article-copyright">
                <div class="creativeCommons" v-if="blogIntro.is_original === 1">
                  版权声明：本文为博主原创文章，遵循
                  <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener"> CC 4.0 BY-SA </a>
                  版权协议，转载请附上原文出处链接和本声明。
                </div>
                <div v-if="blogIntro.is_original === 0">
                  转载来源：
                  <a :href="blogIntro.reprint_url" target="_blank">
                    {{blogIntro.reprint_url}}
                  </a>
                </div>
                <div class="creativeCommons">
                  本文链接：
                  <a :href="locationHref">
                    {{locationHref}}
                  </a>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
        <div class="markdown-body content-box"
             @click.prevent="hrefClick"
             ref="content"
             :style="showAll ? '' : { maxHeight: maxHeight + 'px' }"
             v-html="blogIntro.content">
        </div>
        <div v-if="!showAll" class="showAll">
          <span @click="showAll = true">
            展开阅读全文
            <i class="el-icon-arrow-down"></i>
          </span>
        </div>
        <detail-comment :id="blogIntro.id"/>
      </div>
    </div>
  </main>
</template>

<script>
import { apiGetUserIntro, apiGetBlogIntro, apiGetBlogList, apiGetBlogType, apiGetBlogSummary } from '@/api/http_url'
import { mavonEditor } from 'mavon-editor'
// import marked from 'marked'
// import 'mavon-editor/dist/markdown/github-markdown.min.css'
import hljs from 'highlight.js'
// import 'highlight.js/styles/googlecode.css'
import { getScrollTop, getWindowHeight } from '@/assets/js/util'
import DetailComment from '@/views/blog/DetailComment'

export default {
  name: 'IndexPage',
  data () {
    return {
      userId: this.$route.params.userId,
      blogId: this.$route.params.blogId,
      blogTotal: 0,
      currentPage: Number.parseInt(this.$route.query.page || 1),
      blogIntro: {},
      blogSummary: {},
      blogHot: [],
      blogNew: [],
      blogType: [],
      search: '',
      blogNull: false,
      userIntro: {},
      locationHref: window.location.href,
      slideVisible: false,
      showAll: false,
      maxHeight: 1300,
      asideFixed: false,
      userSelf: false
    }
  },
  watch: {
    '$route.params.blogId' (newVal) {
      this.blogId = newVal
      this.getGetBlogIntro()
    },
    '$store.state.userIntro': {
      handler (newVal) {
        if (newVal && newVal.constructor === Object) {
          if (this.userId.toString() === newVal.id.toString()) {
            this.userSelf = true
          }
        }
      },
      immediate: true,
      deep: true
    },
    search (newVal) {
      this.$router.push(`/blog/${this.userIntro.id}?search=${newVal}`)
    }
  },
  created () {
    this.getGetBlogIntro()
    this.getUserIntro()
    this.getGetBlogSummary()
    this.getGetBlogHot()
    this.getGetBlogNew()
    this.getGetBlogType()
    const result = Promise.all([
      this.getGetBlogIntro(),
      this.getUserIntro(),
      this.getGetBlogSummary(),
      this.getGetBlogHot(),
      this.getGetBlogNew(),
      this.getGetBlogType()
    ])
    result.then((data) => {
      this.verifyScroll()
    }, (err) => {
      console.error(err)
    })
  },
  methods: {
    // 获取用户信息
    getUserIntro () {
      return apiGetUserIntro({ id: this.userId }).then(res => {
        this.$store.dispatch('SET_BLOG_USER', res)
        this.userIntro = res
      })
    },
    getGetBlogIntro () {
      return apiGetBlogIntro({ id: this.blogId }).then(res => {
        // 改变网页标题
        document.title = res.title + '_Globm Blog'
        // const head = document.getElementsByTagName('head')
        // const meta = document.createElement('meta')
        // document.querySelector('meta[name="keywords"]').setAttribute('content', res.tag)
        // document.querySelector('meta[name="description"]').setAttribute('content', res.desc)
        // head[0].appendChild(meta)
        this.$store.dispatch('SET_BLOG_TITLE', res.title)
        this.blogIntro = res
        // marked 解析
        // this.blogIntro.content = marked(res.content_md)
        // MarkdownIt 解析
        const md = mavonEditor.getMarkdownIt()
        this.blogIntro.content = md.render(res.content_md)
        this.handleDetail()
      })
    },
    // highlight
    handleDetail () {
      this.$nextTick(_ => {
        this.$refs.content.querySelectorAll('pre code').forEach(item => {
          const ol = document.createElement('ol')
          const lines = item.innerHTML.split('\n').length - 1
          for (let i = 0; i <= lines; i++) {
            ol.appendChild(document.createElement('li'))
          }
          item.parentElement.append(ol)
          const copy = document.createElement('i')
          copy.className = 'el-icon-document-copy code-copy'
          item.parentElement.append(copy)
          hljs.highlightBlock(item)
          copy.onclick = _ => {
            const text = item.innerText
            const oInput = document.createElement('textarea')
            oInput.value = text
            document.body.appendChild(oInput)
            oInput.select()
            document.execCommand('Copy')
            this.$notice.success('复制成功')
            oInput.remove()
          }
        })
        this.verifyHeight()
      })
    },
    // 固定高度
    verifyHeight () {
      // const height = this.$refs.content.clientHeight
      // this.showAll = this.maxHeight > height
      this.showAll = true
    },
    // 滚动监听
    verifyScroll () {
      let elHeight = 0
      window.onscroll = _ => {
        const scroll = getScrollTop() + getWindowHeight()
        const inHeight = this.$refs.aside.scrollHeight + this.$refs.aside.offsetTop
        elHeight = inHeight > elHeight ? inHeight : elHeight
        const coHeight = this.$refs.blogBox.scrollHeight + this.$refs.blogBox.offsetTop
        if (scroll >= elHeight && scroll < coHeight) {
          this.asideFixed = true
          this.$refs.aside.style.bottom = 0
        } else if (scroll >= coHeight) {
          this.$refs.aside.style.bottom = Math.abs(document.querySelector('footer').offsetTop - scroll) + 'px'
        } else {
          this.asideFixed = false
        }
      }
    },
    // 文章统计
    getGetBlogSummary () {
      return apiGetBlogSummary({ user_id: this.userId }).then(res => {
        this.blogSummary = res
      })
    },
    // 热门文章
    getGetBlogHot () {
      const data = {
        limit: 6,
        user_id: this.userId,
        order: JSON.stringify([
          ['view', 'DESC']
        ])
      }
      return apiGetBlogList(data).then(res => {
        this.blogHot = res.rows
      })
    },
    // 最新文章
    getGetBlogNew () {
      const data = {
        limit: 6,
        user_id: this.userId,
        order: JSON.stringify([
          ['created_time', 'DESC']
        ])
      }
      return apiGetBlogList(data).then(res => {
        this.blogNew = res.rows
      })
    },
    // 文章分类
    getGetBlogType () {
      return apiGetBlogType({ user_id: this.userId }).then(res => {
        this.blogType = res.rows
      })
    },
    // 用户图片加载失败
    handleError (e) {
      e.target.src = require('@/assets/img/user-avatar.jpg')
    },
    // 外链跳转
    hrefClick (e) {
      if (e.target.localName === 'a') {
        const { href } = this.$router.resolve({
          path: '/external_link',
          query: { href: e.target.href }
        })
        window.open(href, '_blank')
      }
    }
  },
  // 监听移除
  beforeDestroy () {
    window.onscroll = null
    this.$store.dispatch('SET_BLOG_TITLE', null)
    this.$store.dispatch('SET_BLOG_USER', null)
  },
  components: {
    DetailComment
  }
}
</script>

<style lang="scss" scoped>
  ul{
    li{
      list-style: none;
    }
  }
  main{
    .main-wrapper{
      width: $max-width;
      margin: 0 auto;
      overflow: hidden;
      padding: 15px 0;
      aside{
        width: 300px;
        float: left;
        &.fixed{
          position: fixed;
          bottom: 0;
          z-index: 99;
          top: auto;
        }
        .profile{
          margin-bottom: 8px;
          background-color: #fff;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
          .intro{
            overflow: hidden;
            padding: 16px 16px 6px 16px;
            .avatar{
              float: left;
              width: 48px;
              height: 48px;
              i{
                font-size: 48px;
                color: $primary-color;
              }
              img{
                width: 100%;
                height: 100%;
                display: block;
                border-radius: 50%;
              }
            }
            .blog-info{
              float: left;
              margin-left: 8px;
              width: calc(100% - 56px);
              .name{
                margin-right: 6px;
                font-size: 14px;
                font-weight: 500;
                color: #555666;
                line-height: 28px;
              }
              .desc{
                color: #999aaa;
                font-size: 13px;
                line-height: 20px;
              }
            }
          }
          .data-info{
            padding: 9px 0;
            margin: 0 10px;
            line-height: 22px;
            text-align: center;
            display: flex;
            border-bottom: solid 1px #f5f6f7;
            dl{
              width: 100%;
              dd{
                color: #999aaa;
              }
            }
          }
          .search{
            padding: 16px 20px 16px;
          }
        }
        .aside-box{
          margin-bottom: 8px;
          background-color: #fff;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
          padding: 16px 0;
          h4{
            font-weight: normal;
            padding: 0 16px 8px;
            margin-bottom: 8px;
            border-bottom: 1px solid #f3f3f3;
            i{
              vertical-align: middle;
              margin-right: 6px;
              color: $primary-color;
              font-size: 16px;
            }
            span{
              font-weight: bold;
              font-size: 14px;
              line-height: 20px;
              color: #333;
            }
          }
        }
        .typeBlog{
          @extend .aside-box;
          ul{
            li{
              a{
                line-height: 28px;
                padding: 7px 16px;
                display: block;
                overflow: hidden;
                color: #555666;
                &:hover{
                  .type{
                    color: $primary-color;
                  }
                }
                > img{
                  float: left;
                  width: 28px;
                  height: 28px;
                  margin-right: 12px;
                  border-radius: 4px;
                }
                .type{
                  float: left;
                  margin-right: 8px;
                  max-width: 175px;
                  display: block;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .view{
                  float: right;
                  line-height: 28px;
                  color: #D4D4DE;
                  i{
                    font-size: 12px;
                    margin-left: 4px;
                    margin-right: 3px;
                  }
                }
              }
            }
          }
        }
        .archiveBlog{
          @extend .aside-box;
          .archive-box{
            padding: 0 10px 0 10px;
            .archive-title{
              font-size: 14px;
              line-height: 22px;
              color: #4a4d52;
              margin-bottom: 8px;
              padding: 0 6px;
            }
            .archive-content{
              display: flex;
              flex-wrap: wrap;
              word-wrap: break-word;
              .archive-item{
                width: 56px;
                margin-right: 6px;
                margin-left: 6px;
                margin-bottom: 12px;
                a{
                  display: block;
                  &:hover{
                    .count{
                      color: $primary-color;
                    }
                  }
                  .time{
                    display: block;
                    height: 22px;
                    background-color: #edf0f3;
                    border-radius: 6px 6px 0 0;
                    opacity: .8;
                    color: #999aaa;
                    line-height: 22px;
                    margin-bottom: 1px;
                    text-align: center;
                  }
                  .count{
                    display: block;
                    height: 22px;
                    background-color: #f6f8fa;
                    border-radius: 0 0 6px 6px;
                    color: #555666;
                    line-height: 20px;
                    font-weight: 500;
                    text-align: center;
                  }
                }
              }
            }
          }
        }
        .hotBlog{
          @extend .aside-box;
          ul{
            li{
              a{
                line-height: 22px;
                padding: 7px 16px;
                display: block;
                overflow: hidden;
                color: #415b76;
                &:hover{
                  background: #f9fafc;
                  color: $primary-color;
                }
                .view{
                  line-height: 22px;
                  color: #D4D4DE;
                  i{
                    font-size: 12px;
                    margin-left: 4px;
                    margin-right: 3px;
                  }
                }
              }
            }
          }
        }
        .group-chat{
          margin-bottom: 15px;
          background-color: #fff;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
          padding: 16px 0;
          h4{
            font-weight: normal;
            padding: 0 16px 8px;
            margin-bottom: 8px;
            border-bottom: 1px solid #f3f3f3;
            i{
              vertical-align: middle;
              margin-right: 6px;
              color: $primary-color;
              font-size: 16px;
            }
            span{
              font-weight: bold;
              font-size: 14px;
              line-height: 20px;
              color: #333;
            }
          }
          .chat-box{
            padding: 0 16px;
            overflow: hidden;
            img{
              float: left;
              width: 120px;
              height: 120px;
            }
            .detail{
              float: left;
              width: calc(100% - 128px);
              margin-left: 8px;
              padding: 25.5px 0;
              .intro{
                color: #333333;
                text-align: center;
                line-height: 23px;
              }
              .tel{
                color: #555555;
                font-size: 12px;
                line-height: 23px;
                text-align: center;
              }
            }
          }
        }
      }
      .blog-box{
        float: right;
        width: calc(100% - 315px);
        margin-left: 15px;
        /*background: white;*/
        /*padding: 16px 24px 24px;*/
        .header-box{
          padding: 24px;
          background: #fff;
          h1{
            margin-bottom: 5px;
            font-size: 20px;
            word-wrap: break-word;
            color: #505059;
            font-weight: bold;
            line-height: 45px;
          }
          .info-box{
            @include clear-box;
            background: #f7f7fc;
            border-radius: 4px;
            .bar-content{
              float: left;
              line-height: 32px;
              .original{
                vertical-align: middle;
                opacity: .6;
              }
              > span{
                display: inline-block;
                margin-left: 12px;
                color: #999aaa;
                &.light{
                  color: rgba(47, 84, 235, 0.6);
                }
                i{
                  margin-right: 5px;
                  font-size: 12px;
                }
              }
            }
            .bar-tag{
              float: right;
              margin-right: 8px;
              line-height: 32px;
              color: rgba(47, 84, 235, 0.6);
              font-size: 12px;
              &:hover{
                color: $primary-color;
              }
              span{
                cursor: pointer;
              }
              a {
                color: rgba(47, 84, 235, 0.6);
                &:hover{
                  color: $primary-color;
                }
              }
            }
          }
          .slide-box{
            padding: 4px 0;
            overflow: hidden;
            border-bottom: 1px solid #f5f6f7;
            .tags-box{
              .tags-item-box{
                font-size: 13px;
                line-height: 18px;
                margin-top: 8px;
                margin-right: 8px;
                .label{
                  display: inline-block;
                  color: #555666;
                }
                .tag-link{
                  margin-right: 8px;
                  padding: 3px 6px;
                  font-size: 12px;
                  background-color: #fff;
                  color: #4a88c4;
                  border: 1px solid #eaeaef;
                  border-radius: 4px;
                  &:hover{
                    color: $primary-color;
                    border-color: $primary-color;
                  }
                }
              }
            }
            .article-copyright{
              padding: 8px 8px 8px 0;
              color: #6f6f82;
              font-size: 13px;
              line-height: 20px;
              letter-spacing: 1px;
              a{
                color: #4a88c4;
                &:hover{
                  color: $primary-color;
                }
              }
            }
          }
        }
        /deep/.content-box{
          overflow: hidden;
          padding: 0 24px 24px;
          background: #fff;
          pre{
            border-radius: 3px;
            border: 1px solid #C3CCD0;
            padding: 16px 16px 16px 55px;
            position: relative;
            overflow-y: hidden;
            font-size: 1em;
            background: white;
            &:after{
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 40px;
              height: 16px;
              /*background: #f6f8fa;*/
              background: #f1f1f1;
            }
            div.hljs{
              padding: 0;
              /*background: #f6f8fa;*/
              background: white;
              code{
                line-height: 26px;
              }
              > ol{
                position: absolute;
                top: 0;
                left: 0;
                line-height: 26px;
                padding: 16px 0;
                list-style-type:none;
                counter-reset:sectioncounter;
                margin-bottom: 0;
                background: #f1f1f1;
                color: #777;
                font-size: 12px;
                li{
                  margin-top: 0;
                  &:before{
                    content:counter(sectioncounter) "";
                    counter-increment:sectioncounter;
                    display: inline-block;
                    width: 40px;
                    text-align: center;
                    /*border-right: solid 1px #777;*/
                  }
                }
              }
              i.code-copy{
                position: absolute;
                top:0;
                right: 0;
                background-color: #555;
                padding: 3px;
                margin: 5px 5px 0 0;
                font-size: 11px;
                border-radius: inherit;
                color: #fff;
                cursor: pointer;
                display: none;
                transition: all .3s ease-in-out;
              }
            }
            &:hover .hljs i.code-copy{
              display: block;
            }
          }
        }
        .showAll{
          position: relative;
          left: 0;
          bottom: 0;
          padding-bottom: 30px;
          z-index: 99;
          padding-top: 160px;
          margin-top: -160px;
          background-image: linear-gradient(-180deg,rgba(255,255,255,0) 0%,#fff 90%);
          text-align: center;
          span{
            cursor: pointer;
            transition: .2s;
            &:hover{
              color: $primary-color;
            }
            i{
              color: $primary-color;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
