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
    filtersArraySet: {
      initial: ['LOOTAPALOOZA', 'GVG', 'TGT', 'OG', 'LOE', 'ICECROWN', 'KARA', 'BRM', 'GANGS', 'UNGORO', 'HOF'],
      changed: ['LOOTAPALOOZA', 'GVG', 'TGT', 'OG', 'LOE', 'ICECROWN', 'KARA', 'BRM', 'GANGS', 'UNGORO', 'HOF']
    },
    filtersArrayClass: {
      initial: ['Mage', 'Priest', 'Warlock', 'Hunter', 'Paladin', 'Warrior', 'Druid', 'Shaman', 'Rogue'],
      changed: ['Mage', 'Priest', 'Warlock', 'Hunter', 'Paladin', 'Warrior', 'Druid', 'Shaman', 'Rogue']
    }
  },
  mutations: {
    updateCards(state, newCards) {
      return state.cardsArray = newCards;
    },
    updateShowRecent(state, newState) {
      return state.showRecent = !newState;
    },
    updateFilters(state, newFilters, filter) {
      return state.filtersArraySet.changed = newFilters;
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
