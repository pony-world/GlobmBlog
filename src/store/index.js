import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken, removeToken } from '@/assets/js/token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    regular: {
      email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      password: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/
    },
    token: getToken(),
    userIntro: null
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    REMOVE_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INTRO: (state, userIntro) => {
      state.userIntro = userIntro
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
    }
  },
  getters: {
    token: state => {
      return state.token ? (state.token.constructor === Object ? state.token.token : JSON.parse(state.token).token) : null
    }
  }
})
