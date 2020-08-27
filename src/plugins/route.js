
import router from '@/router/index'
import store from '@/store'

router.beforeEach((to, from, next) => {
  // 移除上级页面请求
  store.commit('SET_API_REMOVE')

  if (to.matched.length === 0) {
    next('/')
  } else {
    next()
  }
})
