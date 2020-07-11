<template>
  <div class="CommentPage">
    <MPageTitle title="文章管理" :total="commentTotal"/>
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的文章评论" name="first"></el-tab-pane>
      <el-tab-pane label="待我审核的评论" name="second"></el-tab-pane>
    </el-tabs>
    <div class="comment-wrapper" v-if="!commentNull">
      <div class="comment-list">
        <div class="comment-item" v-for="(item,ins) in commentData" :key="ins">
          <div class="img-avatar-box">
            {{item.name.substr(0, 1)}}
          </div>
          <div class="comment-item-content">
            <div class="comment-item-title">
              <div class="item-title-left">
                <span class="user-name">{{item.name}}</span>
                <span class="data">{{item.email}}</span>
                <span class="data">{{new Date(item.created_time).pattern("yyyy-MM-dd hh:mm:ss")}}</span>
                <span class="comment">回复了你的文章</span>
                <router-link class="title" :to="`/blog/${item.blog_intro.user_id}/detail/${item.blog_intro.id}`" target="_blank">
                  {{item.blog_intro.title}}
                </router-link>
              </div>
              <div class="item-title-right">
                <span v-show="item.is_show === 0" @click="handleAudit(item.id)">通过审核</span>
                <span @click="handleDel(item.id)">删除</span>
              </div>
            </div>
            <div class="comment-item-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 32 32" class="zuo-icon icon">
                <path d="M14.75 26c0 2.05-1.65 3.7-3.7 3.7H3.7C1.65 29.7 0 28.05 0 26V12.45C0 7.05 4.4 2.6 9.85 2.6h1.25c.65 0 1.25.55 1.25 1.25V6.3c0 .65-.55 1.25-1.25 1.25H9.85c-2.7 0-4.9 2.2-4.9 4.9v.6c0 1 .85 1.85 1.85 1.85h4.3c2.05 0 3.7 1.65 3.7 3.7V26zM32 26c0 2.05-1.65 3.7-3.7 3.7h-7.4c-2.05 0-3.7-1.65-3.7-3.7V12.45c0-5.4 4.4-9.85 9.85-9.85h1.25c.65 0 1.25.55 1.25 1.25V6.3c0 .65-.55 1.25-1.25 1.25h-1.25c-2.7 0-4.9 2.2-4.9 4.9v.6c0 1 .85 1.85 1.85 1.85h4.3c2.05 0 3.7 1.65 3.7 3.7V26z"></path>
              </svg>
              <p>{{item.content}}</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 32 32" class="you-icon icon"><path d="M14.9 19.6c0 5.4-4.4 9.85-9.85 9.85H3.8c-.65 0-1.25-.55-1.25-1.25v-2.45c0-.65.55-1.25 1.25-1.25h1.25c2.7 0 4.9-2.2 4.9-4.9V19c0-1-.85-1.85-1.85-1.85H3.8c-2.05 0-3.7-1.65-3.7-3.7v-7.4c0-2.05 1.65-3.7 3.7-3.7h7.4c2.05 0 3.7 1.65 3.7 3.7V19.6zm17.2 0c0 5.4-4.4 9.85-9.85 9.85H21c-.65 0-1.25-.55-1.25-1.25v-2.45c0-.65.55-1.25 1.25-1.25h1.25c2.7 0 4.9-2.2 4.9-4.9V19c0-1-.85-1.85-1.85-1.85H21c-2.05 0-3.7-1.65-3.7-3.7v-7.4c0-2.05 1.65-3.7 3.7-3.7h7.4c2.05 0 3.7 1.65 3.7 3.7V19.6z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <m-page v-if="commentTotal > 10" :total="commentTotal" :current-page="currentPage" @change="changePage"/>
    </div>
    <div class="blog-list-null" v-else>
      <i class="ico icon-null-null"></i>
      <p>空空如也</p>
    </div>
  </div>
</template>

<script>
import { apiGetBlogComment, apiPutBlogComment, apiDelBlogComment } from '@/api/http_url'

export default {
  name: 'CommentPage',
  data () {
    return {
      commentData: [],
      commentTotal: 0,
      activeName: 'first',
      currentPage: Number.parseInt(this.$route.query.page || 1),
      commentNull: false
    }
  },
  watch: {
    activeName: {
      handler () {
        this.getBlogComment()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getBlogComment () {
      this.commentData = []
      this.commentTotal = 0
      this.commentNull = false
      const data = {
        limit: 10,
        offset: (this.currentPage - 1) * 10,
        is_show: this.activeName === 'first' ? undefined : 0
      }
      apiGetBlogComment(data).then(res => {
        this.commentData = res.rows
        this.commentTotal = res.count
        this.commentNull = this.commentTotal === 0
      })
    },
    handleAudit (id) {
      apiPutBlogComment({ id, is_show: 1 }).then(_ => {
        this.getBlogComment()
        this.$notice.success('评论审核成功')
      }).catch(err => {
        this.$notice.error(err.msg)
      })
    },
    handleDel (id) {
      this.$confirm('此操作将删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apiDelBlogComment({ id }).then(_ => {
          this.getBlogComment()
          this.$notice.success('评论删除成功')
        }).catch(err => {
          this.$notice.error(err.msg)
        })
      }).catch(_ => {
        return false
      })
    },
    changePage (page) {
      this.$router.push({ query: { page } })
      this.currentPage = page
      this.getBlogComment()
    }
  }
}
</script>

<style lang="scss" scoped>
  .CommentPage{
    .comment-wrapper{
      .comment-list{
        .comment-item{
          padding: 7px 5px 12px;
          line-height: 22px;
          border-bottom: 1px dashed #ddd;
          overflow: hidden;
          transition: background-color .3s;
          &:hover{
            background: #fbfbfb;
          }
          .img-avatar-box{
            float: left;
            line-height: 32px;
            width: 32px;
            height: 32px;
            margin-top: 2px;
            background: $primary-color;
            border-radius: 50%;
            text-align: center;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
          }
          .comment-item-content{
            float: left;
            width: calc(100% - 32px - 10px);
            margin-left: 10px;
            .comment-item-title{
              margin-top: 5px;
              margin-bottom: 12px;
              overflow: hidden;
              .item-title-left{
                float: left;
                width: calc(100% - 105px);
                @include single-line-ellipsis;
                .user-name{
                  color: rgb(79, 79, 79);
                  margin-right: 8px;
                }
                .data{
                  color: #999;
                  margin-right: 8px;
                }
                .comment{
                  font-size: 13px;
                }
                .title{
                  color: $primary-color;
                  transition: color .3s;
                  &:hover{
                    color: $primary-hover-color;
                  }
                }
              }
              .item-title-right{
                float: right;
                text-align: right;
                width: 105px;
                span:first-child{
                  color: $primary-color;
                  font-size: 12px;
                  cursor: pointer;
                  &:after{
                    content: '';
                    margin: 0 9px;
                    display: inline-block;
                    height: .9em;
                    width: 1px;
                    vertical-align: middle;
                    position: relative;
                    top: -.06em;
                    background: #e8eaec;
                  }
                }
                span:last-child{
                  color: #ED4040;
                  font-size: 12px;
                  cursor: pointer;
                }
              }
            }
            .comment-item-box{
              position: relative;
              svg:first-child{
                position: absolute;
                left: 0;
                top: 3px;
                height: 16px;
                fill: #d4d4d4;
              }
              svg:last-child{
                position: absolute;
                right: 0;
                bottom: 3px;
                height: 16px;
                fill: #d4d4d4;
              }
              p{
                max-width: 930px;
                display: block;
                word-wrap: break-word;
                padding: 0 32px;
                color: #5e5e5e;
              }
            }
          }
        }
      }
    }
    .blog-list-null{
      text-align: center;
      padding: 120px 0;
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
</style>
