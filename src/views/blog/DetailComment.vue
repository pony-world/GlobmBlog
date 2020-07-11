<template>
  <div class="DetailComment">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="60px" label-position="left" label-suffix=":">
      <el-form-item label="昵称" class="position-item" prop="name">
        <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" class="position-item" prop="email">
        <el-input v-model="form.email" placeholder="请输入有效邮箱"></el-input>
      </el-form-item>
      <el-form-item label="评论" prop="content">
        <el-input v-model="form.content" type="textarea" placeholder="优质评论可以帮助作者获得更高权重"></el-input>
      </el-form-item>
      <el-form-item class="last-item">
        <div class="comment-btn">
          <span>发布评论</span>
          <el-button type="primary" icon="el-icon-edit" :loading="loading" size="small" @click="submitForm">发表评论</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div class="comment-list" v-if="commentList.length > 0">
      <div class="comment-item" v-for="(item, ins) in commentList" :key="ins">
        <div class="img-avatar">{{item.name.substr(0, 1)}}</div>
        <div class="comment-item-content">
          <span class="user_name">{{item.name}}</span>
          <span class="comment">评论</span>
          <span>：</span>
          <p class="content">{{item.content}}</p>
          <span class="date">{{new Date(item.created_time).pattern("yyyy-MM-dd hh:mm:ss")}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetBlogCommentAll, apiPostBlogComment } from '@/api/http_url'

export default {
  name: 'DetailComment',
  data () {
    return {
      form: {},
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'change' },
          { max: 10, message: '昵称最长为10个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          { pattern: this.$store.state.regular.email, message: '邮箱格式不正确' }
        ],
        content: [
          { required: true, message: '请输入评论', trigger: 'change' },
          { max: 1000, message: '评论最长为1000个字符', trigger: 'blur' }
        ]
      },
      commentList: []
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getBlogCommentAll()
  },
  methods: {
    getBlogCommentAll () {
      apiGetBlogCommentAll({ blog_id: this.id }).then(res => {
        this.commentList = res.rows
      })
    },
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const data = {
            ...this.form,
            blog_id: this.id
          }
          this.loading = true
          apiPostBlogComment(data).then(_ => {
            this.$notice.success('评论成功')
            this.form.content = ''
            this.commentList.unshift({
              ...data,
              created_time: new Date()
            })
            this.loading = false
          }).catch(err => {
            this.loading = false
            this.$notice.error(err.msg)
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  .DetailComment{
    margin-top: 3px;
    /*border: dashed 1px #adb4c0;*/
    border-radius: 5px;
    padding: 24px;
    background: #fff;
    /deep/.el-form{
      .last-item{
        margin-bottom: 0;
        .comment-btn {
          overflow: hidden;
          > span {
            float: left;
            color: #b9b9b9;
            user-select: none;
          }
          .el-button{
            float: right;
          }
        }
      }
      .position-item{
        display: inline-block;
        width: 50%;
        padding-right: 12px;
        + .position-item{
          padding-right: 0;
          padding-left: 12px;
        }
      }
    }
    .comment-list{
      .comment-item{
        overflow: hidden;
        margin-bottom: 12px;
        .img-avatar{
          float: left;
          line-height: 32px;
          width: 32px;
          height: 32px;
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
          line-height: 22px;
          padding: 5px 0;
          .user_name{
            color: #000;
          }
          .comment{
            color: #999;
            margin: 0 8px;
            font-size: 12px;
          }
          .content{
            display: inline-block;
          }
          .date{
            color: #999;
            margin-left: 8px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
