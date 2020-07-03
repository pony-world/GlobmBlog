<template>
  <div class="upload-img">
    <div v-if="loadType === 'action'">
      <div class="upload-success" v-if="value || readOnly">
        <img :src="value" alt="">
        <label class="ico-success" v-if="!readOnly">
          <i class="el-icon-upload-success el-icon-check"></i>
        </label>
        <span class="box">
            <span>
              <i class="el-icon-zoom-in" title="look" @click="beforeViewers"></i>
              <i v-if="!readOnly" class="el-icon-edit" title="edit" @click="choose"></i>
              <i v-if="!readOnly" class="el-icon-delete" title="delete" @click="del"></i>
            </span>
          </span>
      </div>
      <div class="el-upload el-upload--picture-card" @click="choose" v-else>
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <el-progress type="circle" :percentage="percentage" :status="status" v-if="loadType === 'onload'"/>
    <input ref="file" type="file" name="file" style="display: none" accept="image/*" @change="change">
    <p class="img-fixed" v-if="fixed.length >= 2">建议图片宽高比例为{{fixed[0]}} * {{fixed[1]}}，不超过1MB</p>
    <MImgCropper :visible.sync="cropperVisible" :file="cropperFile" @upload="cropperUpload"/>
    <el-image-viewer v-if="viewerVisible" :on-close="closeViewer" :urlList="[value]"/>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import imgBeforeUpload from '@/mixins/imgBeforeUpload'

export default {
  name: 'MImgCard',
  mixins: [imgBeforeUpload],
  data () {
    return {
      upFile: {},
      percentage: 0,
      loadType: 'action',
      status: undefined,
      cropperVisible: false,
      cropperFile: {},
      viewerVisible: false
    }
  },
  components: {
    ElImageViewer
  },
  props: {
    value: String,
    fixed: {
      type: Array,
      default () {
        return [1, 1]
      }
    },
    readOnly: Boolean,
    beforeViewer: Function
  },
  methods: {
    choose () {
      this.$refs.file.click()
    },
    beforeViewers () {
      if (typeof this.beforeViewer === 'function') {
        this.beforeViewer(this.value)
      } else {
        this.viewerVisible = true
      }
    },
    del () {
      this.$emit('input', '')
    },
    change (ev) {
      const file = ev.target.files[0]
      this.beforeUpload(file).then(_ => {
        this.cropperFile = file
        this.cropperVisible = true
      })
    },
    async cropperUpload (file) {
      this.cropperFile = {}
      this.percentage = 0
      this.status = undefined
      this.loadType = 'onload'
      this.imgUpload(file).then(res => {
        this.percentage = 100
        this.status = 'success'
        this.$emit('input', res)
        this.$refs.file.value = ''
        setTimeout(_ => {
          this.loadType = 'action'
        }, 500)
      }).catch(_ => {
        this.status = 'exception'
        setTimeout(_ => {
          this.$emit('input', '')
          this.loadType = 'action'
        }, 500)
      })
    },
    closeViewer () {
      this.viewerVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .upload-img{
    .upload-success{
      width: 100px;
      height: 100px;
      border-radius: 4px;
      border: 1px solid #c0ccda;
      position: relative;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }
      .ico-success{
        font-size: 12px;
        position: absolute;
        right: -15px;
        top: -6px;
        width: 40px;
        height: 24px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
        i{
          color: #fff;
          transform: rotate(-45deg);
          display: block;
          margin-top: 11px;
        }
      }
      .box{
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        transition: opacity .3s;
        font-size: 16px;
        text-align: center;
        color: #fff;
        span{
          display: block;
          width: 100%;
          margin: (50px - 9px) 0;
          line-height: 18px;
          i{
            display: inline-block;
            cursor: pointer;
            + i{
              margin-left: 10px;
            }
          }
        }
      }
      &:hover{
        .box{
          display: block;
        }
        .ico-success{
          display: none;
        }
      }
    }
    .el-upload--picture-card{
      height: 100px;
      width: 100px;
      line-height: 100px;
      img{
        width: 100%;
        object-fit: contain;
      }
    }
    .img-fixed{
      color: #999;
      font-size: 12px;
      letter-spacing: 1px;
    }
    /deep/.el-progress{
      vertical-align: bottom;
      .el-progress-circle{
        width: 100px!important;
        height: 100px!important;
      }
    }
    /deep/.el-image-viewer__btn{
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
    }
  }
</style>
