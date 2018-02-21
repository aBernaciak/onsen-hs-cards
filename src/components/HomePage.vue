<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="fa-sliders"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <div class="header" :class="{ 'header-hidden': headerHidden }">
      <img src="../assets/game-logo-hearthstone.png" class="hs-logo">
    </div>

    <v-ons-list class="text">
      <v-ons-list-header>
        Card
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="popover" :class="{ shown: popover.shown }">{{popover.message}}</div>
        <div class="center autocomplete-container">
          <v-autocomplete v-model='item'
                          @item-selected='itemSelected'
                          @update-items='update'
                          @focus='inputFocused'
                          @change='showPopover'
                          :items="itemsSortedComputed"
                          :min-len='3'
                          :wait='300'
                          :get-label='getLabel'
                          :component-item='template'
                          :auto-select-one-item='false'
                          :input-attrs="{ placeholder: 'Start typing card name..',
                                          name: 'input-test',
                                          id: 'v-my-autocomplete',
                                          'class': 'search-input search-input--material' }">

          </v-autocomplete>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="no-padding">

        <div class="center">

          <v-ons-icon  v-if="ifCardChosen"
                       @click="clearCard"
                       size="35px"
                       style="color: red" icon="fa-times"
                       class="close-icon">

          </v-ons-icon>
          <transition name="fade">
            <CardImage v-bind:ifChosenPassed="ifCardChosen"
                       v-bind:imgSrcPassed="imgChosen">

            </CardImage>
          </transition>

        </div>

      </v-ons-list-item>

      <transition name="fade">
        <CardDesc v-bind:ifChosenPassed="ifCardChosen"
                  v-bind:cardPassed="cardChosenComputed">

        </CardDesc>
      </transition>
    </v-ons-list>

    <transition name="fade">
      <v-ons-list class="recently-searched" v-show="$store.state.showRecent">
        <v-ons-list-header>
          Recently searched <small class="pull-right">(Last 7 searches)</small>
        </v-ons-list-header>
        <div class="recently-searched-container">
        <v-ons-list-item v-for="card in cards">
          <div class="center" @click="setRecently(card.cardName)">{{ card.cardName.name }}</div>
        </v-ons-list-item>
        </div>
      </v-ons-list>
    </transition>
  </v-ons-page>
</template>

<script>
import ItemTemplate from './ItemTemplate.vue'
import CardImage from './CardImage.vue'
import CardDesc from './CardDesc.vue'

import { db } from '../store/firebase.js';

export default {
  name: 'home',
  components: {CardImage, CardDesc},
  data () {
    return {
      item: null,
      itemsSorted: [],
      template: ItemTemplate,
      cardArray: null,
      cardChosen: {},
      name: '',
      filters: this.$store.state.filters,
      actionSheetVisible: false,
      ifCardChosen: false,
      autocompleteFocused: false,
      popover: {
        shown: false,
        message: ''
      },
      headerHidden: false
    }
  },
  firebase: {
    cards: db.ref('cards-viewed')
  },
  methods: {
    showPopover(text) {
      if (text.length < 3) {
        this.popover = { shown: true, message: 'Type at least 3 letters..'}
      }
    },
    inputFocused(text) {
      this.headerHidden = true;
    },
    clearCard() {
      this.ifCardChosen = false;
      this.headerHidden = false;
      this.itemsSorted = [];
      this.item = '';
      this.cardChosen = {};
    },
    setRecently(card) {
      this.cardChosen = [card];
      this.ifCardChosen = true;
    },
    itemSelected (item) {
      this.ifCardChosen = false;
      this.search(item.name);
    },
    update (text) {
      var itamz = this.cardArray;
      this.popover.shown = false;
      this.itemsSorted = [];
      this.itemsSorted = itamz.filter((item) => {
        if(item.name != undefined) {
          return (new RegExp(text.toLowerCase())).test(item.name.toLowerCase())
        }
      })

      if(!this.itemsSorted.length) {
        this.popover = { shown: true, message: 'No results.'}
      }
    },
    getLabel (item) {
      return null;
    },
    search(name) {
      this.ifCardChosen = false;
      this.cardChosen = {};
      var array = this.cardArray;
      if (name != '') {
        this.cardChosen = array.filter(function (el) {
          if (el.name == name) {
            return el.name == name;
          }
        });
        this.cardChosenComputed.src = `
          https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${this.cardChosenComputed.id}.png`;
        this.ifCardChosen = true;
      }
    },
    onOffline() {
      this.$ons.notification.alert(`
        Seems like there is no Internet Connection. There might by problems with loading images.
      `);
    }
  },
  watch: {
    cards() {
      this.$forceUpdate();
    },
    itemy(oldVal, newVal) {
      console.log(oldVal, newVal, 'asd')
    }
  },
  computed: {
    cardChosenComputed() {
      if(typeof this.cardChosen[0] !== 'undefined') {
        return this.cardChosen[0];
      }
    },
    imgChosen() {
      if(typeof this.cardChosen[0] !== 'undefined') {
        return this.cardChosen[0].src;
      }
    },
    itemsSortedComputed() {
      return this.itemsSorted.filter(el =>
        this.filters.cardSet.changed.includes(el.set) &&
        this.filters.cardClass.changed.includes(el.playerClass) &&
        this.filters.cardType.changed.includes(el.type)
      );
    }
  },
  created() {
    var storage = window.localStorage;
    if(storage.getItem('cardArray') == null) {
      storage.setItem('cardArray', JSON.stringify(this.$store.state.cardsArray));
    }
    this.cardArray = JSON.parse(storage.getItem('cardArray'));
    document.addEventListener("offline", this.onOffline, false);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  text-align: center;
  transition: all ease-in 0.3s;
  &.header-hidden {
    margin-top: -96px;
  }
}

.close-icon {
  position: absolute;
  right: 10px;
  top: 15px;
  padding: 10px;
}

.autocomplete-container {
  margin-right: 15px;
  padding-right: 0;
}

.recently-searched {
  max-height: 300px;
  overflow: auto;
  .recently-searched-container {
    display: flex;
    flex-direction: column-reverse;
  }
  small {
    padding-right: 15px;
  }
}

.hs-logo {
  max-width: 300px;
  margin: 0 auto -5px;
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-card {
  text-align: center;
}

ons-list-item, ons-card {
  cursor: pointer;
}

.popover {
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 5px;
  top: -12px;
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  color: #fff;
  display: none;
  font-size: 12px;
  font-family: 'Helvetica',sans-serif;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 10px;
  position: absolute;
  width: 200px;
  text-align: center;

  &:before {
    border-top: 7px solid rgba(0,0,0,0.85);
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    bottom: -7px;
    content: '';
    display: block;
    left: 50%;
    margin-left: -7px;
    position: absolute;
  }

  &.shown {
    display: block;
    -webkit-animation: fade-in .3s linear 1, move-up .3s linear 1;
    -moz-animation: fade-in .3s linear 1, move-up .3s linear 1;
    -ms-animation: fade-in .3s linear 1, move-up .3s linear 1;
  }
}
</style>
