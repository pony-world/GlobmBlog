<template>
  <transition name="notice-fade">
    <div v-if="visible" :class="wrapClasses">
      <span class="content">
        <i v-if="type === 'success'" class="el-icon-success"></i>
        <i v-if="type === 'warning'" class="el-icon-warning"></i>
        <i v-if="type === 'error'" class="el-icon-error"></i>
        <i v-if="type === 'info'" class="el-icon-info"></i>
        <span :class="[prefixCls+'-content']">
          {{msg}}
        </span>
      </span>
    </div>
  </transition>
</template>

<script>
const prefixCls = 'notice'
export default {
  name: 'Notice',
  data () {
    return {
      visible: false,
      type: 'info',
      msg: '',
      duration: 3000,
      prefixCls: prefixCls
    }
  },
  computed: {
    wrapClasses () {
      return [`${prefixCls}`, `${prefixCls}-${this.type}`]
    }
  },
  mounted () {
    this.setTimer()
  },
  methods: {
    setTimer () {
      setTimeout(() => {
        this.close()
      }, this.duration)
    },
    close () {
      this.visible = false
      setTimeout(() => {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
  .notice-fade-enter-active,
  .notice-fade-leave-active {
    transition: all .5s ease-in-out;
  }
  .notice-fade-enter, .notice-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
  .notice {
    background-color: transparent!important;
    margin-bottom: 15px;
    text-align: center;
    user-select: none;
    .content{
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(34, 34, 34, 0.2);
      padding: 8px 10px;
      display: inline-block;
      width: auto;
      i{
        margin-right: 3px;
      }
    }
  }
  .notice-success {
    background-color: #fff;
    color: #67C23A;
  }
  .notice-info {
    color: #909399;
    background-color: #fff;
  }
  .notice-warning {
    color: #E6A23C;
    background-color: #fff;
  }
  .notice-error {
    background-color: #fff;
    color: #F56C6C;
  }
  .notice-content {
    font-size: 14px;
  }
</style>
