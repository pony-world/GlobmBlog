<template>
  <div class="slider-verify" :class="rangeStatus? 'success' : ''">
    <div class="slider" ref="slider" v-show="!rangeStatus">
      <i @mousedown="rangeMove" class="moveIco" :class="rangeStatus? 'el-icon-check' : 'el-icon-d-arrow-right'"></i>
    </div>
    <i v-show="rangeStatus" class="el-icon-check"></i>
    {{rangeStatus? '验证成功' : '拖动滑块验证'}}
  </div>
</template>

<script>
export default {
  name: 'MSliderVerify',
  props: {
    verify: Boolean
  },
  data () {
    return {
      disX: 0,
      rangeStatus: false
    }
  },
  methods: {
    rangeMove (e) {
      const slider = this.$refs.slider
      const startX = e.clientX
      const eleWidth = slider.offsetWidth
      const parentWidth = slider.parentElement.offsetWidth
      const MaxX = parentWidth - eleWidth
      if (this.rangeStatus) {
        return false
      }
      document.onmousemove = (e) => {
        const endX = e.clientX
        this.disX = endX - startX
        if (this.disX <= 0) {
          this.disX = 0
        }
        if (this.disX >= MaxX - eleWidth) {
          this.disX = MaxX
        }
        slider.style.transition = '.1s all'
        slider.style.width = this.disX + 38 + 'px'
        e.preventDefault()
      }
      document.onmouseup = () => {
        if (this.disX !== MaxX) {
          slider.style.transition = '.5s all'
          slider.style.width = 38 + 'px'
          // 失败
          this.$emit('update:verify', false)
        } else {
          this.rangeStatus = true
          if (this.status) {
            this.$parent[this.status] = true
          }
          // 成功
          this.$emit('update:verify', true)
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .slider-verify{
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    position: relative;
    user-select: none;
    color: #C0C4CC;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover{
      border-color: #C0C4CC;
    }
    &.success{
      /*border-color: #52ccba;*/
      /*background-color: #d2f4ef;*/
      /*color: #52ccba;*/
      border-color: rgba(47, 84, 235, 0.38);
      background-color: rgba(47, 84, 235, 0.2);
      color: $primary-color;
      i{
        color: #2358ff;
        margin-right: 3px;
      }
    }
    .slider{
      position: absolute;
      left: 0;
      top: 0;
      line-height: 38px;
      box-shadow: 0 0 3px rgba(0,0,0,.3);
      border-radius: 4px;
      min-width: 38px;
      height: 38px;
      transition: background .2s linear;
      &:active{
        background: rgba(47, 84, 235, 0.6);
        color: #fff;
      }
      .moveIco{
        position: absolute;
        right: 0;
        width: 38px;
        height: 38px;
        line-height: 38px;
        cursor: pointer;
        &:active{
          background: $primary-color;
          color: #fff;
        }
      }
    }
  }
</style>
