<template>
  <v-ons-page id="app">
    <v-ons-splitter>
      <v-ons-splitter-side swipeable collapse width="300px"
        :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'"
        :open.sync="menuIsOpen">
        <menu-page></menu-page>
      </v-ons-splitter-side>

      <v-ons-splitter-content>
        <HomePage></HomePage>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script>
import HomePage from './components/HomePage'
import MenuPage from './components/MenuPage'

export default {
  name: 'app',
  computed: {
    menuIsOpen: {
      get () {
        return this.$store.state.splitter.open
      },
      set (newValue) {
        this.$store.commit('splitter/toggle', newValue)
      }
    }
  },
  components: {
    HomePage,
    MenuPage
  },
  beforeDestroy() {
    window.localStorage.setItem('settings', JSON.stringify(this.$store.state.filters));
  },
  mounted() {
    let storage = window.localStorage;
    if( storage.getItem('settings') != null) {
        this.$store.commit('updateFilters', JSON.parse(storage.getItem('settings')));
        console.log(JSON.parse(storage.getItem('settings')).cardSet.changed)
    }
  }
}
</script>

<style lang="scss">
// transition events for components
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
ons-splitter-side[side=left][animation=overlay] {
  border-right: 1px solid #BBB;
}

.list-header {
  margin: 0;
  list-style: none;
  text-align: left;
  display: block;
  box-sizing: border-box;
  padding: 0 0 0 15px;
  font-size: 12px;
  font-weight: 500;
  color: #1f1f21;
  min-height: 24px;
  line-height: 25px;
  text-transform: uppercase;
  position: relative;
  background-color: #eee;
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: top;
  background-image: -webkit-linear-gradient(bottom, #ccc, #ccc 100%);
  background-image: linear-gradient(0deg, #ccc, #ccc 100%);
}

// autocomplete custom styles
.v-autocomplete {
  width: 100%;
  input {
    width: 100%;
  }
  .v-autocomplete-list {
    z-index: 15;
    background: #fff;
    width: 100%;
    max-height: 350px;
    overflow-y: auto;
    padding: 0;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, .12), 0 2px 2px 0 rgba(0, 0, 0, .24), 0 1px 0 0 rgba(255, 255, 255, .6) inset;
    .v-autocomplete-list-item {
      overflow: hidden;
      cursor: pointer;
      padding: 10px;
      background: #fff;
      border-bottom: 1px solid #D3D3D3;
      &:hover {

      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}

//helper classes
.no-padding {
  padding: 0 !important;
}
</style>
