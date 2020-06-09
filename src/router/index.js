import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: _ => import('@/views/home/IndexPage.vue')
  },
  {
    path: '/tool',
    component: _ => import('@/views/tool/IndexPage.vue')
  },
  {
    path: '/blog',
    component: _ => import('@/views/blog/IndexPage.vue')
  },
  {
    path: '/blog/:userId/detail/:blogId',
    component: _ => import('@/views/blog/DetailPage.vue')
  },
  {
    path: '/ui',
    component: _ => import('@/views/ui/IndexPage.vue')
  },
  {
    path: '/redirect/:path*',
    name: 'redirect',
    component: _ => import('@/views/system/RedirectPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
