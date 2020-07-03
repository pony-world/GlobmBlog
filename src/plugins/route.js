
import router from '@/router/index'

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/')
  } else {
    next()
  }
})
