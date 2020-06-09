<template>
  <main>
    <div class="main-wrapper">
      <aside>
        <div class="profile">
          <div class="intro">
            <div class="avatar">
              <img :src="userIntro.avatar" alt="">
            </div>
            <div class="blog-info">
              <p class="name">{{userIntro.name}}</p>
              <p class="desc">{{userIntro.motto}}</p>
            </div>
          </div>
          <div class="data-info">
            <dl>
              <dt>{{blogIntro.blogOriginalCount}}</dt>
              <dd>原创</dd>
            </dl>
            <dl>
              <dt>{{blogIntro.blogReprintCount}}</dt>
              <dd>转载</dd>
            </dl>
            <dl>
              <dt>{{blogIntro.commentCount}}</dt>
              <dd>评论</dd>
            </dl>
            <dl>
              <dt>{{blogIntro.blogViewCount}}</dt>
              <dd>访问</dd>
            </dl>
          </div>
          <div class="search">
            <el-input placeholder="搜博主文章" v-model="search">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <div class="hotBlog">
          <h4>
            <i class="el-icon-document"></i>
            <span>热门文章</span>
          </h4>
          <ul>
            <li v-for="(item, ins) in blogHot" :key="ins">
              <a :href="`/blog/detail/${item.id}`" target="_blank">
                {{item.title}}
                <span class="view">
                  <i class="ico icon-view"></i>
                  {{item.views}}
                </span>
              </a>
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
      <div class="blog-box">
        <div class="header-box">
          <h1>{{blogDetail.title}}</h1>
          <div class="info-box">
            <div class="bar-content">
              <svg class="original" width="36px" height="32px" v-if="blogDetail.title">
                <polygon points="0 0,0 32,36 26,36 6" :fill="blogDetail.isOriginal === 1 ? 'rgba(47,84,235,0.8)' : 'rgba(0,180,0,0.8)'"/>
                <text x="3" y="21" fill="#fff">{{blogDetail.isOriginal === 1 ? '原创' : '转载'}}</text>
              </svg>
              <span class="light">{{userIntro.name}}</span>
              <span><i class="ico icon-view"></i>{{blogDetail.views}}</span>
              <span>{{new Date(blogDetail.createTime).pattern("yyyy-MM-dd hh:mm:ss")}}</span>
            </div>
            <div class="bar-tag">
              <span @click="slideVisible = !slideVisible">{{slideVisible ? '收起' : '展开'}}</span>
            </div>
          </div>
          <el-collapse-transition>
            <div class="slide-box" v-show="slideVisible">
              <div class="tags-box">
                <div class="tags-item-box" v-if="blogDetail.keywords">
                  <span class="label">博客标签：</span>
                  <router-link to="1" class="tag-link" v-for="(item, ins) in blogDetail.keywords.split(',')" :key="ins">
                    {{item}}
                  </router-link>
                </div>
              </div>
              <div class="article-copyright">
                <div class="creativeCommons" v-if="blogDetail.isOriginal === 1">
                  版权声明：本文为博主原创文章，遵循
                  <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener"> CC 4.0 BY-SA </a>
                  版权协议，转载请附上原文出处链接和本声明。
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
        <div class="markdown-body content-box" ref="content" v-html="blogDetail.content"></div>
      </div>
    </div>
  </main>
</template>

<script>
import { apiGetUserIntro, apiGetBlogDetail, apiGetBlogIntro, apiGetBlogHot } from '@/api/http_url'
import marked from 'marked'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

export default {
  name: 'IndexPage',
  data () {
    return {
      userId: Number.parseInt(this.$route.params.userId),
      blogId: Number.parseInt(this.$route.params.blogId),
      blogTotal: 0,
      currentPage: Number.parseInt(this.$route.query.page || 1),
      blogDetail: {},
      blogIntro: {},
      blogHot: [],
      search: '',
      blogNull: false,
      userIntro: {},
      locationHref: window.location.href,
      slideVisible: false
    }
  },
  created () {
    this.getUserIntro()
    this.getGetBlogDetail()
    this.getGetBlogIntro()
    this.getGetBlogHot()
  },
  methods: {
    getUserIntro () {
      apiGetUserIntro({ id: this.userId }).then(res => {
        this.userIntro = res
      })
    },
    getGetBlogDetail () {
      apiGetBlogDetail({ id: this.blogId }).then(res => {
        this.blogDetail = res
        this.blogDetail.content = marked(res.markdown)
        this.$nextTick(_ => {
          this.$refs.content.querySelectorAll('pre code').forEach(item => {
            const ol = document.createElement('ol')
            const lines = item.innerHTML.split('\n').length - 1
            for (let i = 0; i <= lines; i++) {
              ol.appendChild(document.createElement('li'))
            }
            item.parentElement.append(ol)
            hljs.highlightBlock(item)
          })
        })
      })
    },
    getGetBlogIntro () {
      apiGetBlogIntro({ userId: this.userId }).then(res => {
        this.blogIntro = res
      })
    },
    getGetBlogHot () {
      apiGetBlogHot({ userId: this.userId, limit: 6 }).then(res => {
        this.blogHot = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  main{
    min-height: 100vh;
    background: #f5f6f7;
    .main-wrapper{
      width: $max-width;
      margin: 0 auto;
      overflow: hidden;
      padding: 15px 0;
      aside{
        width: 300px;
        float: left;
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
        .recommendLink{
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
          ul{
            li{
              a{
                display: block;
                overflow: hidden;
                padding: 0 16px;
                color: #415b76;
                &:hover{
                  background: #f9fafc;
                  color: $primary-color;
                }
                > span{
                  float: left;
                  line-height: 40px;
                }
                > i{
                  float: right;
                  line-height: 40px;
                }
              }
            }
          }
        }
        .hotBlog{
          @extend .recommendLink;
          ul{
            li{
              a{
                line-height: 22px;
                padding: 7px 16px;
                .view{
                  float: none;
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
        background: white;
        padding: 16px 24px 24px;
        .header-box{
          margin-bottom: 16px;
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
              span{
                cursor: pointer;
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
              }
            }
          }
        }
        /deep/.content-box{
          pre{
            border-radius: 3px;
            border: 1px solid #C3CCD0;
            position: relative;
            overflow: hidden;
            padding-left: 60px;
            code{
              line-height: 26px;
            }
            > ol{
              position: absolute;
              top: 0;
              left: 5px;
              line-height: 26px;
              padding: 16px 0;
              list-style-type:none;
              counter-reset:sectioncounter;
              margin-bottom: 0;
              li{
                margin-top: 0;
                &:before{
                  content:counter(sectioncounter) "";
                  counter-increment:sectioncounter;
                  display: inline-block;
                  width: 40px;
                  text-align: center;
                  border-right: solid 1px rgba(0, 0, 0, 0.53);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
