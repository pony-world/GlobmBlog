<template>
  <div class="MImgUpload">
    <el-dialog
      title="图片上传"
      top="calc(50vh - 160px)"
      :visible.sync="visible"
      :closeOnClickModal="false"
      :before-close="beforeClose"
      width="500px">
      <el-upload
        v-if="uploadVisible"
        class="upload-demo"
        drag
        action=""
        :before-upload="onBeforeUpload"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">建议上传jpg/png文件，且不超过1MB</div>
      </el-upload>
      <div class="upload-demo" v-else>
        <el-progress :percentage="percentage" type="circle" :status="uploadStatus" :width="170"/>
      </div>
    </el-dialog>
    <MImgCropper :visible.sync="cropperVisible" :file="cropperFile" @upload="cropperUpload"/>
  </div>
</template>

<script>
import imgBeforeUpload from '@/mixins/imgBeforeUpload'

export default {
  name: 'MImgDialog',
  mixins: [imgBeforeUpload],
  data () {
    return {
      uploadVisible: true,
      cropperVisible: false,
      cropperFile: {},
      percentage: 0,
      uploadStatus: null
    }
  },
  props: {
    visible: Boolean
  },
  watch: {
    visible (newVal) {
      if (!newVal) {
        this.uploadVisible = true
        this.cropperVisible = false
      }
    }
  },
  methods: {
    beforeClose () {
      this.$emit('update:visible', false)
    },
    onBeforeUpload (file) {
      this.beforeUpload(file).then(_ => {
        this.cropperFile = file
        this.cropperVisible = true
      })
      return false
    },
    async cropperUpload (file) {
      this.uploadVisible = false
      this.percentage = 0
      this.uploadStatus = null
      this.imgUpload(file).then(res => {
        this.percentage = 100
        this.uploadStatus = 'success'
        setTimeout(_ => {
          this.$emit('upload', res)
          this.$emit('update:visible', false)
        }, 500)
      }).catch(_ => {
        this.uploadStatus = 'exception'
        setTimeout(_ => {
          this.uploadVisible = true
        }, 500)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-demo{
    height: 210px;
    /deep/.el-upload{
      width: 100%;
      .el-upload-dragger{
        width: 100%;
      }
    }
    /deep/.el-progress{
      display: block;
      padding-top: 20px;
      .el-progress-circle{
        margin: 0 auto;
      }
    }
  }
</style>
