
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/element-theme.scss'
import { Button, Input, Pagination } from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Pagination.name, Pagination)
Vue.component(CollapseTransition.name, CollapseTransition)
