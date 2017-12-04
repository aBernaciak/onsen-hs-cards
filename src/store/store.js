import Vue from 'vue'
import Vuex from 'vuex'
import Cards from './cards.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cardsArray: Cards
  },
  mutations: {
    updateCards(state, newCards) {
      return state.cardsArray = newCards;
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
