// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

import './store/firebase';

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

//global
Vue.filter('extendedSet', function(setName) {
 	if (!setName) return ''
  switch(setName) {
    case 'LOOTAPALOOZA':
      return 'Kobolds and Catacombs';
    case 'GVG':
      return 'Goblins vs Gnomes';
    case 'TGT':
      return 'The Grand Tournament';
    case 'LOE':
      return 'The League of Explorers';
    case 'ICECROWN':
      return 'Knights of the Frozen Throne';
    case 'KARA':
      return 'One night in Karazhan';
    case 'BRM':
      return 'Blackrock Mountain';
    case 'GANGS':
      return 'Mean streets of Gadgetzan';
    case 'UNGORO':
      return 'Journey to UN\'GORO';
    case 'OG':
      return 'Whispers of the Old Gods';
    case 'HOF':
      return 'Halls of Fame - no longer playable in standard mode';
    default:
      return setName;
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
