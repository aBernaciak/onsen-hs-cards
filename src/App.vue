<template>
  <v-ons-page id="app">
    <v-ons-splitter>
      <v-ons-splitter-side swipeable collapse width="250px"
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
ons-splitter-side[side=left][animation=overlay] {
  border-right: 1px solid #BBB;
}
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
</style>
