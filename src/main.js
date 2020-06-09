import Vue from 'vue'
import wrapper from './wrapper.vue'
import router from './router'
import store from './store'
import '@/assets/style/index.scss'
import './plugins/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(wrapper)
}).$mount('#wrapper')
