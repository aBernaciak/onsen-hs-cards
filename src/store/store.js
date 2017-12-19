import Vue from 'vue'
import Vuex from 'vuex'
import Cards from './cards.json'
import { db } from './firebase.js';

var VueFire = require('vuefire')

Vue.use(Vuex)
Vue.use(VueFire)

export default new Vuex.Store({
  state: {
    cardsArray: Cards,
    cardsViewed: db.ref('cards-viewed'),
    showRecent: false,
    filters: {
      cardSet: {
        initial: ['LOOTAPALOOZA', 'GVG', 'TGT', 'OG', 'LOE', 'ICECROWN', 'KARA', 'BRM', 'GANGS', 'UNGORO', 'HOF'],
        changed: ['LOOTAPALOOZA', 'GVG', 'TGT', 'OG', 'LOE', 'ICECROWN', 'KARA', 'BRM', 'GANGS', 'UNGORO', 'HOF']
      },
      cardClass: {
        initial: ['MAGE', 'PRIEST', 'WARLOCK', 'HUNTER', 'PALADIN', 'WARRIOR', 'DRUID', 'SHAMAN', 'ROGUE', 'NEUTRAL'],
        changed: ['MAGE', 'PRIEST', 'WARLOCK', 'HUNTER', 'PALADIN', 'WARRIOR', 'DRUID', 'SHAMAN', 'ROGUE', 'NEUTRAL']
      }
    }
  },
  mutations: {
    updateCards(state, newCards) {
      return state.cardsArray = newCards;
    },
    updateShowRecent(state, newState) {
      return state.showRecent = !newState;
    },
    updateFilters(state, newFilters) {
      return state.filters = newFilters;
    }
  },
  modules: {
    splitter: {
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle (state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen
          } else {
            state.open = !state.open
          }
        }
      }
    }
  }
})
