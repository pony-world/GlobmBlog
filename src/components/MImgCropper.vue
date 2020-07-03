<template>
  <el-dialog
    title="图片上传"
    top="calc(50vh - 232px)"
    :visible.sync="visible"
    :closeOnClickModal="false"
    :before-close="beforeClose"
    width="600px">
    <div class="cropper-content">
      <div class="cropper">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
          @realTime="realTime"
        />
      </div>
      <div class="scope-btn">
        <el-button size="mini" type="primary" plain @click="changeScale(1)">+</el-button>
        <el-button size="mini" type="primary" plain @click="changeScale(-1)">-</el-button>
        <el-button size="mini" type="primary" plain @click="rotateLeft">↺</el-button>
        <el-button size="mini" type="primary" plain @click="rotateRight">↻</el-button>
        <el-button class="confirm" size="small" type="primary" @click="confirm">裁剪</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'MImgCropper',
  data () {
    return {
      option: {
        img: '', // 裁剪图片的地址
        info: false, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        // fixed: true, // 是否开启截图框宽高固定比例
        // fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: true, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    }
  },
  props: {
    visible: Boolean,
    file: [File, Object]
  },
  watch: {
    file: {
      handler (newVal) {
        if (newVal instanceof File) {
          this.option.img = window.URL.createObjectURL(newVal)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    beforeClose () {
      this.$emit('update:visible', false)
    },
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    // 实时预览
    realTime (data) {
      this.previews = data
    },
    confirm () {
      this.$refs.cropper.getCropData(fileData => {
        this.$emit('upload', fileData)
        this.$emit('update:visible', false)
      })
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="scss" scoped>
  .cropper-content{
    overflow: hidden;
    width: 540px;
    .cropper{
      width: 440px;
      height: 350px;
      float: left;
    }
    .scope-btn{
      float: left;
      width: 100px;
      height: 350px;
      text-align: center;
      padding-left: 30px;
      padding-top: 50px;
      position: relative;
      .el-button{
        width: 40px;
        height: 30px;
        margin: 0 0 15px;
      }
      .confirm{
        position: absolute;
        bottom: 0;
        left: 30px;
        width: 70px;
        height: 40px;
        margin-bottom: 0;
      }
    }
  }
</style>
