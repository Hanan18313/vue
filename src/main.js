// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementUI, { TableColumn } from 'element-ui';
import {Button, Select,Container,Carousel,Row,Col,MessageBox,Dialog,Table,Menu,MenuItem,Submenu,Form,FormItem,Pagination,Input} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import enLocale from 'element-ui/lib/locale/lang/zh-CN';
Vue.use(ElementUI)
Vue.use(enLocale)
Vue.use(Container,Button,Table,Form,Row,Menu,MenuItem,FormItem,TableColumn,Pagination,Input,Submenu)
Vue.component(Button.name,Button)
Vue.component(Select.name,Select)
Vue.component(Container.name,Container)
Vue.component(Carousel.name,Carousel)
Vue.component(Row.name,Row)
Vue.component(Col.name,Col)
Vue.component(MessageBox.name,MessageBox)
Vue.component(Dialog.name,Dialog)
Vue.component(Table.name,Table)
Vue.component(Menu.name,Menu)
Vue.component(MenuItem.name,MenuItem)
Vue.component(Form.name,Form)
Vue.component(FormItem.name,FormItem)
Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h =>h(App), 
  components: { App },
  template: '<App/>'  
})
