<template>
  <div>
    <div class="IssuePage" v-if="visible">
      <div class="header">
        <router-link to="/user/blog/article" class="route-back">
          <i class="el-icon-arrow-left"></i>文章管理
        </router-link>
        <div class="inp-box">
          <el-input placeholder="请输入文章标题" maxlength="100" show-word-limit v-model="row.title"></el-input>
        </div>
        <i class="detail el-icon-s-operation" title="摘要" @click="detailVisible = true"></i>
        <div class="btn-issue">
          <el-button type="primary" @click="handleIssueOpen">发布文章</el-button>
        </div>
        <div class="user-avatar">
          <img :src="userIntro.avatar || require('@/assets/img/user-avatar.jpg')" alt="" @error="handleError">
          <HeaderAside :intro="userIntro"/>
        </div>
      </div>
      <mavon-editor
        toolbarsBackground="#2F54EB"
        ref="md"
        :toolbars="toolbars"
        :externalLink="false"
        @imgAdd="imgAdd"
        v-model="row.content_md"/>
      <el-dialog
        title="文章摘要"
        v-if="detailVisible"
        :visible.sync="detailVisible"
        :close-on-click-modal="false"
        top="calc(50vh - 168px)"
        width="430px">
        <el-input
          type="textarea"
          placeholder="请输入摘要内容"
          v-model="row.desc"
          maxlength="230"
          show-word-limit
          resize="none"
          :autosize="{minRows: 10}"
        >
        </el-input>
      </el-dialog>
      <el-dialog
        title="发布文章"
        v-if="issueVisible"
        :visible.sync="issueVisible"
        :close-on-click-modal="false"
        top="calc(50vh - 271px)"
        :before-close="beforeClose"
        width="600px">
        <p class="form-native">
          <i class="el-icon-warning-outline"></i>
          请勿发布涉及政治、广告、营销、翻墙、违反国家法律法规等内容
        </p>
        <el-form :model="row"
                 label-width="80px"
                 label-position="left"
                 hide-required-asterisk
                 @submit.native.prevent
                 label-suffix=":">
          <el-form-item label="文章标签" prop="keywords">
            <m-tag v-model="row.tag" text="+ 新建文章标签"/>
          </el-form-item>
          <el-form-item label="分类专栏" prop="typeId">
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新建文章分类</el-button>
            <div class="type-btn">
              <el-radio-group v-model="row.type_id">
                <el-radio v-for="(item, ins) in typeOptions" :key="ins" :label="item.id">{{item.title}}</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="文章类型" prop="isOriginal">
            <el-radio v-model="row.is_original" :label="0">转载</el-radio>
            <el-radio v-model="row.is_original" :label="1">原创</el-radio>
            <el-input placeholder="转载文章请输入文章来源" v-model="row.reprint_url"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button @click="beforeClose">取消</el-button>
            <el-button type="primary" :loading="loading" @click="handleIssue">发布文章</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="IssueSuc" v-else>
      <div class="finished-box">
        <router-link to="/user/blog/article" class="route-back">
          <i class="el-icon-arrow-left"></i>文章管理
        </router-link>
        <div class="info-box">
          <p class="title">{{row.title}}</p>
          <p class="desc">{{row.desc}}</p>
          <p class="text">仗剑天涯，从你的摘要开始</p>
        </div>
        <div class="btn-box">
          <router-link :to="`/blog/${userIntro.id}/detail/${row.id}`" class="to-article">
            <i class="el-icon-success"></i>发布成功并查看文章<i class="el-icon-arrow-right"></i>
          </router-link>
          <router-link to="/redirect/user/blog/issue" class="btn-new">
            再写一篇
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetUserIntro, apiUploadQn, apiGetBlogIntro, apiGetBlogType, apiPostBlogType, apiPostBlog, apiPutBlog } from '@/api/http_url'
import { mavonEditor } from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// import 'mavon-editor/dist/markdown/github-markdown.min.css'
import MTag from '@/components/MTag'
import { isEmpty } from '@/assets/js/util'
import HeaderAside from '@/views/system/HeaderAside'

export default {
  name: 'IssuePage',
  data () {
    return {
      visible: true,
      row: { is_original: 1 },
      userIntro: {},
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        alignrights: true, // 右对齐
        /* 2.2.1 */
        subfield: true // 单双栏模式
      },
      detailVisible: false,
      issueVisible: false,
      loading: false,
      typeOptions: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  watch: {
    '$store.getters.token': {
      handler (newVal) {
        if (!newVal) {
          this.$router.replace('/login?path=' + this.$route.fullPath)
          this.$notice('请先登录')
        } else if (!this.$store.state.userIntro) {
          this.getUserIntro()
        }
      },
      immediate: true
    },
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
  created () {
    if (this.$route.query.id) {
      apiGetBlogIntro({ id: this.$route.query.id }).then(res => {
        if (isEmpty(res)) {
          this.$router.replace(this.$route.path)
        } else {
          this.row = res
        }
      })
    }
  },
  methods: {
    getUserIntro () {
      apiGetUserIntro().then(res => {
        this.$store.dispatch('SET_USER_INTRO', res)
      })
    },
    handleError (e) {
      e.target.src = require('@/assets/img/user-avatar.jpg')
    },
    imgAdd (pos, $file) {
      const data = new FormData()
      data.append('file', $file)
      apiUploadQn(data).then(res => {
        const url = res.fileName
        this.$refs.md.$img2Url(pos, url)
      }).catch(_ => {
        this.$notice.error('上传失败')
      })
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        if (this.typeOptions.filter(item => item.title === inputValue).length === 0) {
          apiPostBlogType({ title: inputValue }).then(res => {
            this.typeOptions.unshift(res)
          }).catch(err => {
            this.$notice.error(err.msg)
          })
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleIssueOpen (ev) {
      ev.target.blur()
      this.typeOptions = []
      apiGetBlogType().then(res => {
        this.typeOptions = res.rows
        this.issueVisible = true
      }).catch(err => {
        this.$notice.error(err.msg)
      })
    },
    beforeClose () {
      if (!this.loading) {
        this.issueVisible = false
      }
    },
    async handleIssue () {
      this.loading = true
      if (!this.row.desc) {
        let desc = this.$refs.md.d_render.replace(/<.*?>/g, '')
        desc.replace(/(\n)/g, '')
        desc.replace(/(\t)/g, '')
        desc.replace(/(\r)/g, '')
        desc.replace(/\s*/g, '')
        desc = desc.substring(0, 200) + '...'
        this.$set(this.row, 'desc', desc)
      }
      const arr = [
        ['title', '文章标题'],
        ['type_id', '文章分类'],
        ['tag', '文章标签'],
        ['content_md', '文章内容']
      ]
      const str = arr.find(item => !this.row[item[0]])
      const reg = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i
      if (str) {
        this.$notice(`${str[1]}不能为空`)
      } else if (this.row.is_original === 0 && (!this.row.reprint_url || !reg.test(this.row.reprint_url))) {
        if (!this.row.reprint_url) {
          this.$notice('转载文章需声明文章来源')
        } else {
          this.$notice('文章来源格式错误')
        }
      } else {
        if (this.row.id) {
          await apiPutBlog(this.row).then(_ => {
            this.$notice.success('文章发布成功')
            this.visible = false
          }).catch(err => {
            this.$notice.error(err.msg)
          })
        } else {
          await apiPostBlog(this.row).then(res => {
            this.$notice.success('文章发布成功')
            this.row.id = res.id
            this.visible = false
          }).catch(err => {
            this.$notice.error(err.msg)
          })
        }
      }
      this.loading = false
    }
  },
  components: {
    mavonEditor,
    MTag,
    HeaderAside
  }
}
</script>

<style lang="scss" scoped>
  .IssuePage{
    .header{
      line-height: 56px;
      height: 56px;
      /*overflow: hidden;*/
      @include clear-box;
      padding: 0 20px;
      .route-back{
        float: left;
        width: 90px;
        font-weight: bold;
        color: #0d3313;
        transition: color .2s;
        i{
          font-weight: bold;
          vertical-align: middle;
          margin-right: 3px;
        }
        &:hover{
          color: $primary-color;
        }
      }
      .inp-box{
        float: left;
        width: calc(100% - 260px - 35px);
        /deep/.el-input__inner{
          color: #000;
        }
      }
      .detail{
        float: left;
        width: 20px;
        margin-left: 15px;
        line-height: 56px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
        transition: color .2s;
        &:hover{
          color: $primary-color;
        }
      }
      .btn-issue{
        float: left;
        margin: 0 15px;
      }
      .user-avatar{
        float: left;
        width: 40px;
        height: 56px;
        cursor: pointer;
        position: relative;
        &:hover{
          /deep/.user-control{
            display: block;
          }
        }
        > img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-top: 8px;
        }
      }
    }
    /deep/.v-note-wrapper{
      height: calc(100vh - 56px);
      z-index: 99;
      .v-note-op .v-left-item .op-icon, .v-note-op .v-right-item .op-icon{
        color: #fff;
        &.selected,&:hover,&:focus{
          background: #333;
        }
      }
      pre {
        border-radius: 3px;
        border: 1px solid #C3CCD0;
        position: relative;
        code {
          line-height: 26px;
        }
      }
    }
    .form-native{
      height: 36px;
      line-height: 36px;
      background: #fff6e5;
      border-radius: 4px;
      font-size: 12px;
      color: #e33e33;
      padding: 0 13px;
      margin-bottom: 15px;
      i{
        margin-right: 6px;
      }
    }
    .button-new-tag {
      margin-left: 5px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 5px;
      vertical-align: bottom;
    }
    .type-btn{
      width: 99%;
      height: 130px;
      margin-top: 8px;
      border-radius: 4px;
      border: 1px solid #e8e8ee;
      padding: 0 12px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
  .IssueSuc{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f4f4f4;
    .finished-box{
      position: fixed;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
      z-index: 121;
      background-color: #fff;
      border-radius: 4px;
      width: 600px;
      height: auto;
      padding: 24px;
      .route-back{
        font-size: 15px;
        width: 90px;
        font-weight: bold;
        color: #0d3313;
        transition: color .2s;
        i{
          font-weight: bold;
          vertical-align: middle;
          margin-right: 3px;
        }
        &:hover{
          color: $primary-color;
        }
      }
      .info-box{
        margin: 30px 0;
        background-color: #f5f6f7;
        padding: 23px;
        .title{
          font-size: 16px;
          color: #474747;
          @include single-line-ellipsis;
        }
        .desc{
          font-size: 14px;
          color: #999;
          margin: 12px 0;
          line-height: 22px;
          @include multi-line-ellipsis(4);
        }
        .text{
          font-size: 14px;
          color: #6b6b6b;
          text-align: right;
        }
      }
      .btn-box{
        text-align: center;
        .to-article{
          display: inline-block;
          color: $primary-color;
          margin-right: 23px;
          i:first-child{
            margin-right: 3px;
          }
          i:last-child{
            margin-left: 3px;
          }
        }
      }
      .btn-new{
        color: $primary-color;
        text-decoration: underline;
      }
    }
  }
</style>
