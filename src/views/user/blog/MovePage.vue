<template>
  <div class="MovePage">
    <MPageTitle title="博客搬家"/>
    <el-form :model="form" label-width="120px" label-suffix=":" label-position="left">
      <el-form-item label="博客搬迁地址">
        <div class="move-logo-box">
          <img src="@/assets/img/blog/move/csdn-logo.png" alt="">
        </div>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="form.user_id" placeholder="请输入用户ID,如weixin_43525XXX">
          <el-button slot="append" icon="el-icon-search" @click="handleSearchBlog"></el-button>
        </el-input>
        <p>注：输入用户ID获取文章列表并选择文章申请迁移</p>
      </el-form-item>
      <el-form-item label="博客列表" v-if="blogList.length > 0">
        <div class="blogList">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkedOptions" @change="handleCheckedChange">
            <ul>
              <li v-for="(item, ins) in blogList.rows" :key="ins">
                <el-checkbox :label="item.id">{{item.title}}</el-checkbox>
              </li>
            </ul>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="博客申请">
        <el-checkbox v-model="checkedAgree">
          我承诺搬迁的博客为我本人博客，如搬迁他人博客所产生的后果由我本人承担
        </el-checkbox>
        <div></div>
        <el-button type="primary" @click="handleSubmit">申请搬家</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiGetBlogMoveList } from '@/api/http_url'

export default {
  name: 'MovePage',
  data () {
    return {
      form: {},
      blogList: [],
      checkAll: false,
      isIndeterminate: true,
      blogOptions: [],
      checkedOptions: [],
      checkedAgree: false
    }
  },
  methods: {
    handleSearchBlog () {
      if (this.form.user_id) {
        apiGetBlogMoveList({ user_id: this.form.user_id }).then(res => {
          this.blogList = res.rows
          this.blogOptions = this.blogList.rows.map(item => { return item.id })
        }).catch(err => {
          this.$notice.error(err.msg)
        })
      } else {
        this.$notice('请输入用户ID')
      }
    },
    handleCheckAllChange (val) {
      this.checkedOptions = val ? this.blogOptions : []
      this.isIndeterminate = false
    },
    handleCheckedChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.blogOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.blogOptions.length
    },
    handleSubmit () {
      if (!this.checkedAgree) {
        this.$notice('请先勾选并同意我的协议声明')
      } else if (this.checkedOptions.length === 0) {
        this.$notice('请先勾选需搬迁文章')
      } else {
        this.$notice('搬家功能维护中，如有需要请联系博主')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .MovePage{
    .move-logo-box{
      width: 80px;
      height: 40px;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .blogList{
      border: solid 1px #e9e9e9;
      padding: 23px;
      ul{
        overflow: hidden;
        li{
          width: calc(50% - 12px);
          float: left;
          padding: 0 12px;
          line-height: 40px;
          height: 40px;
          overflow: hidden;
          &:nth-child(2n){
            margin-left: 24px;
          }
          &:hover{
            background: #f9f9f9;
          }
          /deep/.el-checkbox{
            width: 100%;
            line-height: 40px;
            overflow: hidden;
            .el-checkbox__input{
              float: left;
              line-height: 40px;
              vertical-align: center;
            }
            .el-checkbox__label{
              float: left;
              @include single-line-ellipsis;
              width: calc(100% - 14px);
              line-height: 40px;
              &:hover{
                color: $primary-color;
              }
            }
          }
        }
      }
    }
  }
</style>
