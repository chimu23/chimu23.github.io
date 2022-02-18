import App from './App'
import './style/tailwind.css'
import './style/global.scss'
import svgIcon from './components/svgIcon/index.vue'  
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component('svgIcon',svgIcon)
  return {
    app
  }
}
