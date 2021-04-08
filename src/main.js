import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
//富文本
import Vue2Editor from "vue2-editor";
Vue.use(Vue2Editor)

Vue.use(ElementUI, { locale })
Vue.use(VCharts)

Vue.config.productionTip = false
router.beforeEach((to,form,next)=>{
  if(to.meta.title){
    document.title = '俏品多后台管理系统'+'>'+to.meta.title
  }
  next()
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
