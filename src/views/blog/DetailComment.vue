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
          <span>ctrl + enter 发布评论</span>
          <el-button type="primary" :loading="loading" @click="submitForm">评论</el-button>
          <el-button style="margin-right: 16px" @click="resetForm">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiPostBlogComment } from '@/api/http_url'

export default {
  name: 'DetailComment',
  data () {
    return {
      form: {},
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { max: 10, message: '昵称最长为10个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: this.$store.state.regular.email, message: '邮箱格式不正确' }
        ],
        content: [
          { required: true, message: '请输入评论', trigger: 'blur' },
          { max: 1000, message: '评论最长为1000个字符', trigger: 'blur' }
        ]
      }
    }
  },
  prop: {
    ID: Number
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const data = {
            ...this.form,
            blog_id: this.ID
          }
          apiPostBlogComment(data).then(_ => {
            this.$notice.success('评论成功')
          }).catch(err => {
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
  }
</style>
