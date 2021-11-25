import App from './App'
import './style/tailwind.css'
import svgIcon from './components/svgIcon/index.vue'  
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component('svgIcon',svgIcon)
  return {
    app
  }
}
// #endif