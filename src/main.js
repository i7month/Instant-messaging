import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index'
import store from './store/index'
import "amfe-flexible" // 引入flexible

// MD5
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
