<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'MPage',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination{
    text-align: center;
    margin: 15px 0;
  }
</style>
