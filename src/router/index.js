import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: _ => import('@/views/home/IndexPage.vue')
  },
  // 实用工具
  // {
  //   path: '/tool',
  //   component: _ => import('@/views/tool/IndexPage.vue')
  // },
  // 博客
  {
    path: '/blog',
    component: _ => import('@/views/blog/IndexPage.vue')
  },
  {
    path: '/blog/:userId',
    component: _ => import('@/views/blog/BlogList.vue')
  },
  {
    path: '/blog/:userId/detail/:blogId',
    component: _ => import('@/views/blog/DetailPage.vue')
  },
  // ui
  // {
  //   path: '/ui',
  //   component: _ => import('@/views/ui/IndexPage.vue')
  // },
  // login
  {
    path: '/login',
    component: _ => import('@/views/login/IndexPage.vue')
  },
  // user
  {
    path: '/user',
    redirect: '/user/intro',
    component: _ => import('@/views/user/IndexPage.vue'),
    children: [
      {
        path: '/user/intro',
        component: _ => import('@/views/user/intro/UserIntro.vue')
      },
      {
        path: '/user/blog/article',
        component: _ => import('@/views/user/blog/ArticlePage.vue')
      },
      {
        path: '/user/blog/comment',
        component: _ => import('@/views/user/blog/CommentPage.vue')
      },
      {
        path: '/user/blog/type',
        component: _ => import('@/views/user/blog/TypePage.vue')
      },
      {
        path: '/user/blog/type/article/:typeId',
        component: _ => import('@/views/user/blog/TypeArticle.vue'),
        meta: { active: '/user/blog/type' }
      },
      {
        path: '/user/blog/issue',
        component: _ => import('@/views/user/blog/IssuePage.vue')
      },
      {
        path: '/user/blog/move',
        component: _ => import('@/views/user/blog/MovePage.vue')
      }
    ]
  },
  {
    path: '/external_link',
    name: '外链跳转',
    component: _ => import('@/views/system/ExternalLink.vue')
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
