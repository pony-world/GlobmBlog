import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken, removeToken } from '@/assets/js/token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cancelApiArr: [],
    regular: {
      email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      password: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/
    },
    token: getToken(),
    userIntro: null,
    blogTitle: null,
    blogUser: null
  },
  mutations: {
    SET_API_APPEND: (state, src) => {
      state.cancelApiArr.push(src.cancelToken)
    },
    SET_API_REMOVE: ({ cancelApiArr }) => {
      cancelApiArr.forEach(item => {
        item('路由跳转取消请求')
      })
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    REMOVE_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INTRO: (state, userIntro) => {
      state.userIntro = userIntro
    },
    SET_BLOG_TITLE: (state, blogTitle) => {
      state.blogTitle = blogTitle
    },
    SET_BLOG_USER: (state, blogUser) => {
      state.blogUser = blogUser
    }
  },
  actions: {
    async SET_TOKEN (context, token) {
      await setToken(token, token.expirationTime)
      context.state.token = token
      await context.commit('SET_TOKEN', context.state.token)
    },
    async REMOVE_TOKEN (context) {
      await removeToken()
      context.state.token = null
      await context.commit('REMOVE_TOKEN', context.state.token)
    },
    async SET_USER_INTRO (context, userIntro) {
      context.state.userIntro = userIntro
      await context.commit('SET_USER_INTRO', context.state.userIntro)
    },
    async SET_BLOG_TITLE (context, blogTitle) {
      context.state.blogTitle = blogTitle
      await context.commit('SET_BLOG_TITLE', context.state.blogTitle)
    },
    async SET_BLOG_USER (context, blogUser) {
      context.state.blogUser = blogUser
      await context.commit('SET_BLOG_USER', context.state.blogUser)
    }
  },
  getters: {
    token: state => {
      return state.token ? (state.token.constructor === Object ? state.token.token : JSON.parse(state.token).token) : null
    }
  }
})
