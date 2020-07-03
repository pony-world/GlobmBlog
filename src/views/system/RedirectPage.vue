<script>
export default {
  beforeCreate () {
    document.title = 'register' + '_Globm Blog'
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
