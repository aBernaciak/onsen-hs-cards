// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

import Vue from 'vue'
import VueOnsen from 'vue-onsenui'
import store from './store/store'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import Autocomplete from 'v-autocomplete'

import 'v-autocomplete/dist/v-autocomplete.css'


Vue.config.productionTip = false

Vue.use(Autocomplete)
Vue.use(VueOnsen)
Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
