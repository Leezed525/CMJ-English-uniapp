import App from './App'
//引入vuex
import store from './store'

import share from "common/share.js"

// #ifndef VUE3
import Vue from 'vue'
//把vuex定义成全局组件
Vue.prototype.$store = store

Vue.mixin(share)
Vue.config.productionTip = false
App.mpType = 'app'
console.log("vue2")
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif