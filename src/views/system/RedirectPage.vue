<script>
export default {
  beforeCreate () {
    const { params, query } = this.$route
    let { path } = params
    path = path ? '/' + path : '/'
    this.$router.replace({ path, query })
  },
  render: function (h) {
    return h()
  }
}
</script>
