import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'


import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css' // normalized css

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(PerfectScrollbar)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});