<template>
  <div class="MPageTitle">
    <div class="header">
      <span class="title">{{title}}</span>
      <span class="total" v-if="total !== 0"><i>{{total}}</i>条数据</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MPageTitle',
  props: {
    title: String,
    total: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    margin-bottom: 12px;
    span{
      display: inline-block;
      line-height: 30px;
    }
    .title{
      font-weight: bold;
      padding-left: 8px;
      position: relative;
      &:before{
        content: '';
        position: absolute;
        left: 0;
        top:8px;
        width: 3px;
        height: 14px;
        background: $primary-color;
      }
      ~ span{
        margin-left: 16px;
      }
    }
    .total{
      color: #666;
      i{
        margin: 0 3px;
        color: $primary-color;
      }
    }
  }
</style>
