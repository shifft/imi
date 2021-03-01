import { Col, Icon, Input, Layout, message, Row, Space } from 'ant-design-vue'
import Vue from 'vue'
import App from './App.vue'

Vue.component(Col.name, Col)
Vue.component(Icon.name, Icon)
Vue.component(Row.name, Row)
Vue.component(Space.name, Space)
Vue.component(Input.name, Input)
Vue.component(Input.Password.name, Input.Password)
Vue.component(Layout.name, Layout)
Vue.component(Layout.Header.name, Layout.Header)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Layout.Footer.name, Layout.Footer)

Vue.prototype.$message = message

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
