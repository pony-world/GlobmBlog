<template>
  <div class="TypeArticle">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/user/blog/type">分类专栏</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="batch-box">
      <span>移动至</span>
      <el-select style="margin-left: 15px" v-model="typeID" placeholder="请选择移动目标的分类专栏">
        <el-option
          v-for="item in typeOption"
          :key="item.id"
          :label="item.title"
          :disabled="item.id === blogTypeID"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button style="margin-left: 15px" type="primary" :loading="loading" @click="handleSubmit">应用</el-button>
    </div>
    <div class="blog-list" v-if="!blogNull">
      <el-checkbox-group v-model="checkList">
        <ul class="blog-box">
          <li class="blog-item" v-for="(item, ins) in blogData" :key="ins">
            <p class="title">
              <el-checkbox :label="item.id"></el-checkbox>
              {{item.title}}
            </p>
            <router-link :to="`/blog/${item.user_id}/detail/${item.id}`" class="btn-look">查看</router-link>
          </li>
        </ul>
      </el-checkbox-group>
      <m-page v-if="blogTotal > 20" :pageSize="20" :total="blogTotal" :current-page="currentPage" @change="changePage"/>
    </div>
    <div class="blog-list blog-list-null" v-else>
      <i class="ico icon-null-null"></i>
      <p>空空如也</p>
    </div>
  </div>
</template>

<script>
import { apiGetBlog, apiGetBlogType, apiPutBlogSort } from '@/api/http_url'

export default {
  name: 'TypeArticle',
  data () {
    return {
      blogData: [],
      blogTypeID: Number.parseInt(this.$route.params.typeId || 0),
      blogTotal: 0,
      blogTypeOption: [],
      currentPage: Number.parseInt(this.$route.query.page || 1),
      blogNull: false,
      checkList: [],
      typeID: '',
      typeOption: '',
      loading: false
    }
  },
  created () {
    this.getBlogList()
    this.getBlogType()
  },
  methods: {
    getBlogList () {
      let data = {
        limit: 20,
        offset: (this.currentPage - 1) * 20,
        type_id: this.blogTypeID,
        order: JSON.stringify([
          ['is_top', 'DESC'],
          ['updated_time', 'DESC']
        ])
      }
      data = Object.assign(data, this.searchForm)
      apiGetBlog(data).then(res => {
        this.blogData = res.rows
        this.blogTotal = res.count
        this.blogNull = this.blogData.length === 0
      })
    },
    changePage (page) {
      this.$router.push({ query: { page } })
      this.currentPage = page
      this.getBlogList()
    },
    getBlogType () {
      apiGetBlogType().then(res => {
        this.typeOption = res.rows
      })
    },
    handleSubmit () {
      if (this.checkList.length === 0) {
        this.$notice('请选择要移动的文章')
        return false
      }
      if (!this.typeID) {
        this.$notice('请选择要移动的分类')
        return false
      }
      this.loading = true
      const data = {
        type_id: this.typeID,
        blog_id: JSON.stringify(this.checkList)
      }
      apiPutBlogSort(data).then(_ => {
        this.changePage(1)
        this.$notice.success('操作成功')
      }).catch(err => {
        this.$notice.error(err.msg)
      }).finally(_ => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .TypeArticle{
    .batch-box{
      padding: 14px 16px;
      width: 970px;
      height: 64px;
      border-top: 1px dotted #ddd;
      border-bottom: 1px dotted #ddd;
      background-color: #fbfbfb;
      > span{
        font-weight: bold;
      }
    }
    .blog-list{
      .blog-box{
        .blog-item{
          padding: 16px;
          border-bottom: 1px dotted #ddd;
          list-style: none;
          height: 57px;
          width: 100%;
          line-height: 25px;
          overflow: hidden;
          &:hover{
            background-color: #fafafa;
          }
          .title{
            float: left;
            width: calc(100% - 12px - 100px);
            margin-right: 12px;
            font-weight: 400;
            color: #212529;
            font-size: 16px;
            @include single-line-ellipsis;
          }
          .btn-look{
            float: right;
            width: 100px;
            text-align: right;
            padding: 0 20px;
            color: $primary-color;
            font-size: 14px;
            cursor: pointer;
            display: block;
            &:hover{
              color: $primary-hover-color;
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
