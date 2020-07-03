<template>
  <main>
    <div class="main-wrapper">
      <aside ref="aside">
        <div class="profile">
          <div class="intro">
            <router-link :to="`/redirect/blog/${userIntro.id}`" class="avatar">
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
            <el-input placeholder="搜博主文章" v-model="search" v-focus="search">
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
              <router-link :to="`/redirect/blog/${userIntro.id}?typeId=${item.id}`">
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
              <router-link :to="`/blog/${item.user_id}/detail/${item.id}`" target="_blank">
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
              <router-link :to="`/blog/${item.user_id}/detail/${item.id}`" target="_blank">
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
      <div class="blog-box">
        <div class="blogType-now" v-if="blogType.length > 0">
          <div v-for="(item, ins) in blogType" :key="ins">
            <div v-if="item.id.toString() === typeId" class="blogType-now-box">
              <div class="bar-content">
                <svg class="original" width="36px" height="32px">
                  <polygon points="0 0,0 32,36 26,36 6" fill="#2f54eb"/>
                  <text x="3" y="21" fill="#fff">分类</text>
                </svg>
                <span class="light">{{item.title}}</span>
                <span><i class="ico el-icon-s-promotion"></i>{{item.blog.length}} 篇</span>
                <span>{{new Date(item.created_time).pattern("yyyy-MM-dd hh:mm:ss")}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="blog-list" v-if="!blogNull">
          <div class="blog-item-box" v-for="(item, ins) in blogData" :key="ins">
            <h4>
              <router-link :to="`/blog/${item.user_id}/detail/${item.id}`" target="_blank" :class="item.is_original === 1 ? 'original' : 'reprint'">
                <span class="original" v-if="item.is_original === 1">原创</span>
                <span class="reprint" v-else>转载</span>
                {{item.title}}
              </router-link>
            </h4>
            <p class="content">
              <router-link :to="`/blog/${item.user_id}/detail/${item.id}`" target="_blank">{{item.desc}}</router-link>
            </p>
            <div class="info">
              <p>
                <span class="date">{{new Date(item.created_time).pattern("yyyy-MM-dd hh:mm:ss")}}</span>
                <span class="read-num"><i class="ico icon-view"></i>{{item.view}}</span>
                <span class="read-num"><i class="ico icon-comment"></i>{{item.comment}}</span>
              </p>
            </div>
          </div>
          <m-page :total="blogTotal" :current-page="currentPage" @change="changePage"/>
        </div>
        <div class="blog-list blog-list-null" v-else>
          <i class="ico icon-null-null"></i>
          <p>空空如也</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { apiGetUserIntro, apiGetBlogList, apiGetBlogType, apiGetBlogSummary } from '@/api/http_url'

export default {
  name: 'IndexPage',
  data () {
    return {
      userId: this.$route.params.userId,
      typeId: this.$route.query.typeId,
      blogSummary: {},
      blogHot: [],
      blogNew: [],
      blogType: [],
      search: this.$route.query.search,
      userIntro: {},
      blogNull: false,
      blogTotal: 0,
      currentPage: Number.parseInt(this.$route.query.page || 1),
      blogData: []
    }
  },
  watch: {
    search () {
      this.changePage(1)
    }
  },
  created () {
    this.getGetBlogList()
    this.getUserIntro()
    this.getGetBlogSummary()
    this.getGetBlogHot()
    this.getGetBlogNew()
    this.getGetBlogType()
  },
  methods: {
    getGetBlogList () {
      apiGetBlogList({
        limit: 10,
        offset: (this.currentPage - 1) * 10,
        user_id: this.userId,
        type_id: this.typeId,
        title: this.search
      }).then(res => {
        this.blogTotal = res.count
        this.blogData = res.rows
        this.blogNull = this.blogData.length === 0
      })
    },
    getUserIntro () {
      apiGetUserIntro({ id: this.userId }).then(res => {
        document.title = res.name + '_Globm Blog'
        this.userIntro = res
      })
    },
    getGetBlogSummary () {
      apiGetBlogSummary({ user_id: this.userId }).then(res => {
        this.blogSummary = res
      })
    },
    getGetBlogHot () {
      const data = {
        limit: 6,
        user_id: this.userId,
        order: JSON.stringify([
          ['view', 'DESC']
        ])
      }
      apiGetBlogList(data).then(res => {
        this.blogHot = res.rows
      })
    },
    getGetBlogNew () {
      const data = {
        limit: 6,
        user_id: this.userId,
        order: JSON.stringify([
          ['created_time', 'DESC']
        ])
      }
      apiGetBlogList(data).then(res => {
        this.blogNew = res.rows
      })
    },
    getGetBlogType () {
      apiGetBlogType({ user_id: this.userId }).then(res => {
        this.blogType = res.rows
      })
    },
    handleError (e) {
      e.target.src = require('@/assets/img/user-avatar.jpg')
    },
    changePage (page) {
      this.$router.push({ query: { page } })
      this.currentPage = page
      this.getGetBlogList()
    }
  },
  beforeDestroy () {
    window.onscroll = null
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
        .blogType-now{
          margin: 24px;
          .blogType-now-box{
            background: #f7f7fc;
            border-radius: 4px;
            .bar-content{
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
          }
        }
        .blog-list{
          .blog-item-box{
            padding: 16px 24px 12px 24px;
            border-bottom: 1px solid #f0f2f5;
            &:hover{
              background: #f9fafc;
              h4{
                a{
                  &.original{
                    color: $primary-color;
                  }
                  &.reprint{
                    color: rgba(0, 180, 0, 0.88);
                  }
                }
              }
            }
            * {
              word-wrap: break-word;
            }
            h4{
              font-weight: normal;
              a{
                display: block;
                word-break: break-all;
                color: #222226;
                font-size: 18px;
                line-height: 20px;
                font-weight: 500;
                @include single-line-ellipsis;
                span{
                  vertical-align: 2px;
                  display: inline-block;
                  box-sizing: border-box;
                  width: 34px;
                  height: 20px;
                  line-height: 20px;
                  text-align: center;
                  font-size: 12px;
                  border-radius: 2px;
                  &.original{
                    color: $primary-color;
                    background-color: rgba(47,84,235,0.2);
                  }
                  &.reprint{
                    color: rgba(0, 180, 0, 0.88);
                    background-color: rgba(0, 180, 0,0.1);
                  }
                }
              }
            }
            .content{
              margin-top: 6px;
              a{
                display: block;
                font-size: 14px;
                line-height: 22px;
                color: #999aaa;
                @include multi-line-ellipsis(2);
              }
            }
            .info{
              p{
                line-height: 24px;
                color: #5f6471;
                .read-num{
                  color: #5f6471;
                  margin-left: 16px;
                  i{
                    color: #c8c8c8;
                    margin-right: 6px;
                  }
                }
              }
            }
          }
        }
        .blog-list-null{
          text-align: center;
          padding: 180px 0;
          i{
            font-size: 200px;
            color: $primary-color;
          }
          p{
            margin-top: 12px;
            font-weight: bold;
            color: #595959;
            font-size: 15px;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
</style>
