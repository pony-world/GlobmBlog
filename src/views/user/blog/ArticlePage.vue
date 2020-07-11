<template>
  <div class="ArticlePage">
    <MPageTitle title="文章管理" :total="blogTotal"/>
    <el-form :inline="true" :model="searchForm" size="small">
      <el-form-item label="标题">
        <el-input v-model="searchForm.title" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item label="文章类型">
        <el-select v-model="searchForm.is_original">
          <el-option label="不限" :value="undefined"></el-option>
          <el-option label="转载" :value="0"></el-option>
          <el-option label="原创" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类专栏">
        <el-select v-model="searchForm.type_id">
          <el-option label="不限" :value="undefined"></el-option>
          <el-option v-for="(item, ins) in blogTypeOption" :label="item.title" :value="item.id" :key="ins"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearchReset">重置</el-button>
        <el-button type="primary" @click="onSearchSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="blog-list" v-if="!blogNull">
      <div class="blog-item-box" v-for="(item, ins) in blogData" :key="ins">
        <h4>
          <router-link :to="`/blog/${item.user_id}/detail/${item.id}`" :class="item.is_original === 1 ? 'original' : 'reprint'">
            <span class="original" v-if="item.is_original === 1">原创</span>
            <span class="reprint" v-else>转载</span>
            <span class="top" v-if="item.is_top === 1">置顶</span>
            {{item.title}}
          </router-link>
        </h4>
        <div class="info">
          <p class="show">
            <span class="date">{{new Date(item.created_time).pattern("yyyy-MM-dd hh:mm:ss")}}</span>
            <span class="read-num"><i class="ico icon-view"></i>{{item.view}}</span>
            <span class="read-num"><i class="ico icon-comment"></i>{{item.comment}}</span>
          </p>
          <p class="handle">
            <router-link :to="`/user/blog/issue?id=${item.id}`">编辑</router-link>
            <span v-if="item.is_top === 0" @click="handleTop(item, 1)">置顶</span>
            <span v-if="item.is_top === 1" @click="handleTop(item, 0)">取消置顶</span>
            <span class="del" @click="handleDel(item.id)">删除</span>
          </p>
        </div>
      </div>
      <m-page v-if="blogTotal > 10" :total="blogTotal" :current-page="currentPage" @change="changePage"/>
    </div>
    <div class="blog-list blog-list-null" v-else>
      <i class="ico icon-null-null"></i>
      <p>空空如也</p>
    </div>
  </div>
</template>

<script>
import { apiGetBlog, apiPutBlog, apiDelBlog, apiGetBlogType } from '@/api/http_url'
import { isEmpty } from '@/assets/js/util'

export default {
  name: 'ArticlePage',
  data () {
    return {
      blogData: [],
      blogTotal: 0,
      blogTypeOption: [],
      currentPage: Number.parseInt(this.$route.query.page || 1),
      blogNull: false,
      activeName: 'first',
      searchForm: {}
    }
  },
  created () {
    this.getBlogList()
    this.getBlogType()
  },
  methods: {
    getBlogList () {
      this.blogData = []
      this.blogTotal = 0
      this.blogNull = false
      let data = {
        limit: 10,
        offset: (this.currentPage - 1) * 10,
        order: JSON.stringify([
          ['is_top', 'DESC'],
          ['updated_time', 'DESC']
        ])
      }
      data = Object.assign(data, this.searchForm)
      apiGetBlog(data).then(res => {
        this.blogData = res.rows
        this.blogTotal = res.count
        this.blogNull = this.blogTotal === 0
      })
    },
    getBlogType () {
      apiGetBlogType().then(res => {
        this.blogTypeOption = res.rows
      })
    },
    changePage (page) {
      this.$router.push({ query: { page } })
      this.currentPage = page
      this.getBlogList()
    },
    handleTop (row, val) {
      apiPutBlog({ id: row.id, is_top: val }).then(res => {
        this.currentPage = 1
        this.getBlogList()
        this.$notice.success('文章修改成功')
      }).catch(err => {
        this.$notice.error(err.msg)
      })
    },
    handleDel (id) {
      this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apiDelBlog({ id }).then(_ => {
          this.currentPage = 1
          this.getBlogList()
          this.$notice.success('文章删除成功')
        }).catch(err => {
          this.$notice.error(err.msg)
        })
      }).catch(_ => {
        return false
      })
    },
    onSearchReset () {
      if (!isEmpty(this.searchForm)) {
        this.searchForm = {}
        this.getBlogList()
      }
    },
    onSearchSubmit () {
      this.getBlogList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .ArticlePage{
    .blog-list{
      .blog-item-box{
        padding: 12px 24px;
        border-bottom: 1px solid #f0f2f5;
        &:last-child{
          border-color: transparent;
        }
        * {
          word-wrap: break-word;
        }
        h4{
          font-weight: normal;
          a{
            display: inline-block;
            word-break: break-all;
            color: #222226;
            font-size: 18px;
            line-height: 25px;
            font-weight: 500;
            transition: .2s;
            &:hover{
              &.original{
                color: $primary-color;
              }
              &.reprint{
                color: rgba(0, 180, 0, 0.88);
              }
            }
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
              &.top{
                color: rgba(109, 102, 90, 0.88);
                background-color: rgba(0, 0, 0, 0.1);
              }
              +span{
                margin-left: 3px;
              }
            }
          }
        }
        .info{
          overflow: hidden;
          line-height: 36px;
          p.show{
            float: left;
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
          p.handle{
            float: right;
            span, a{
              display: inline-block;
              margin-left: 18px;
              cursor: pointer;
              font-size: 12px;
              transition: color .2s;
              color: $primary-hover-color;
              &:hover{
                color: $primary-color;
              }
              &.del{
                color: #ED4040;
              }
              +span{
                position: relative;
                &:before{
                  content: '';
                  position: absolute;
                  top: 12px;
                  left: -9px;
                  width: 1px;
                  height: 12px;
                  background: #e9e9e9;
                }
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
