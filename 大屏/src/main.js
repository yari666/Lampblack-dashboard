import Vue from 'vue'
Vue.config.devtools = true;

import router from "./router"
import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui'
import dataV from '@jiaminghi/data-view'
import less from 'less'
import animated from 'animate.css'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'

Vue.use(ElementUI)
Vue.use(less)
Vue.use(dataV)
Vue.use(animated)

Vue.use(VueAxios, axios)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
