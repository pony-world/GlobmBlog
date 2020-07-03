<template>
  <div class="UserIntro">
    <div class="intro-box">
      <div class="avatar-left">
        <img @click="uploadVisible = true" :src="userIntro.avatar || require('@/assets/img/user-avatar.jpg')" alt="">
        <span class="ico-btn" @click="uploadVisible = true">修改头像</span>
        <MImgDialog :visible.sync="uploadVisible" @upload="handleUpload"/>
      </div>
      <div class="info-right">
        <p class="user_id">
          <span class="id">ID: {{userIntro.id}}</span>
          <router-link :to="`/blog/${userIntro.id}`" class="user ico-btn">个人主页<i class="el-icon-arrow-right"></i></router-link>
        </p>
        <p class="detail">
          <span>昵称：</span>{{userIntro.name}}
        </p>
        <p class="detail">
          <span>邮箱：</span>{{userIntro.email}}
        </p>
        <p class="detail">
          <span>创建时间：</span>{{new Date(userIntro.created_time).pattern('yyyy-MM-dd hh:mm:ss')}}
        </p>
      </div>
    </div>
    <div class="intro-form">
      <div class="form">
        <el-form :rules="rules" ref="ruleForm" :model="ruleForm" label-width="80px" label-position="left" hide-required-asterisk >
          <el-form-item label="昵称" prop="name" :style="update ? '' : {marginBottom: 0}">
            <el-input v-if="update" v-model="ruleForm.name"></el-input>
            <span v-else>{{userIntro.name}}</span>
          </el-form-item>
          <el-form-item label="简介" prop="motto">
            <el-input v-if="update" v-model="ruleForm.motto"></el-input>
            <span v-else>{{userIntro.motto}}</span>
          </el-form-item>
          <el-form-item v-if="update">
            <el-button @click="handleClose('ruleForm')">取消</el-button>
            <el-button type="primary" @click="handleSubmit('ruleForm')" :loading="loading">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span class="update-btn ico-btn" v-if="!update" @click="handleUpdate">修改资料<i class="el-icon-edit"></i></span>
    </div>
  </div>
</template>

<script>
import { apiPutUserIntro } from '@/api/http_url'

export default {
  name: 'UserIntro',
  data () {
    return {
      userIntro: {},
      update: false,
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        motto: [
          { required: true, message: '请输入简介', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      uploadVisible: false
    }
  },
  watch: {
    '$store.state.userIntro': {
      handler (newVal) {
        if (newVal && newVal.constructor === Object) {
          this.userIntro = newVal
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleUpload (url) {
      apiPutUserIntro({ avatar: url }).then(_ => {
        this.userIntro.avatar = url
        this.$store.dispatch('SET_USER_INTRO', { ...this.userIntro })
      }).catch(err => {
        this.$notice.error(err.msg)
      })
    },
    handleUpdate () {
      this.update = true
      this.ruleForm = { ...this.userIntro }
    },
    handleClose (formName) {
      this.ruleForm = { ...this.userIntro }
      this.$refs[formName].clearValidate()
      this.update = false
    },
    handleSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          apiPutUserIntro(this.ruleForm).then(_ => {
            this.$store.dispatch('SET_USER_INTRO', { ...this.ruleForm })
            this.update = false
          }).catch(err => {
            this.$notice.error(err.msg)
          }).finally(_ => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .UserIntro{
    .intro-box{
      overflow: hidden;
      padding-bottom: 12px;
      border-bottom: solid 1px #e0e0e0;
      .avatar-left{
        float: left;
        width: 75px;
        img{
          width: 75px;
          height: 75px;
          display: block;
          border-radius: 50%;
          cursor: pointer;
        }
        span{
          display: block;
          text-align: center;
          color: $primary-color;
          cursor: pointer;
          padding-top: 14px;
        }
      }
      .info-right{
        float: left;
        width: calc(100% - 91px);
        margin-left: 16px;
        .user_id{
          margin-top: 12px;
          line-height: 25px;
          overflow: hidden;
          .id{
            float: left;
            color: #999;
          }
          .user{
            float: right;
            color: $primary-color;
            cursor: pointer;
          }
        }
        .detail{
          line-height: 25px;
          span{
            color: #333333;
          }
        }
      }
    }
    .intro-form{
      margin-top: 30px;
      padding-left: 30px;
      overflow: hidden;
      .form{
        float: left;
        width: calc(100% - 100px);
      }
      .update-btn{
        float: right;
        line-height: 25px;
        color: $primary-color;
        cursor: pointer;
      }
    }
    .ico-btn{
      transition: color .2s;
      &:hover{
        color: $primary-hover-color;
      }
      i{
        margin-left: 5px;
      }
    }
  }
</style>
