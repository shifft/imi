import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min'

Vue.use(ElementUI)

// eslint-disable-next-line
import App from './app'

// eslint-disable-next-line
new Vue({ 
  el: 'main',
  render: (h) => h(App)
})
