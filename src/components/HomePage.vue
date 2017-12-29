<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="fa-sliders"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
<!--       <div class="right">
        <v-ons-toolbar-button @click="actionSheetVisible = true">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div> -->
    </v-ons-toolbar>

    <div class="header">
      <img src="../assets/game-logo-hearthstone.png" class="hs-logo">
    </div>
    <v-ons-list>
      <v-ons-list-header>
        Card
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center autocomplete-container">
          <v-autocomplete v-model='item'
                          :items="itemsSortedComputed"
                          :min-len='0'
                          :wait='100'
                          :get-label="getLabel"
                          :component-item='template'
                          :auto-select-one-item="false"
                          @item-selected="itemSelected"
                          @update-items='update'
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

    <v-ons-action-sheet :visible.sync="actionSheetVisible" cancelable title="Change language">
      <v-ons-action-sheet-button icon="md-square-o" v-for="(lang, index) in langArray" @click="changeLanguage(lang)">
        {{lang}}
      </v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o"  modifier="destructive">
        Close
      </v-ons-action-sheet-button>
    </v-ons-action-sheet>
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
      item: '',
      itemsSorted: [],
      template: ItemTemplate,
      actionSheetVisible: false,
      cardArray: null,
      langArray: ['enUS', 'plPL', 'DeDE'],
      langChosen: 'enUS',
      cardChosen: {},
      ifCardChosen: false,
      name: '',
      filters: this.$store.state.filters,
      autocompleteFocused: false
    }
  },
  firebase: {
    cards: db.ref('cards-viewed')
  },
  methods: {
    clearCard(){
      this.ifCardChosen = false;
      this.itemsSorted = [];
      this.item = '';
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
      if(text.length >= 3) {
        this.itemsSorted = [];
        this.itemsSorted = itamz.filter((item) => {
          if(item.name != undefined) {
            return (new RegExp(text.toLowerCase())).test(item.name.toLowerCase())
          }
        })
      }
      else if (text.length == 0) {
        this.ifCardChosen = false;
        this.item = '';
        this.itemsSorted = [];
      }
    },
    getLabel (item) {
      return item.name;
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
        if (this.cardChosen.length == 0) {
          this.$ons.notification.toast('We couldn\'t find that card.', {timeout: 2000});
        }
        else {
          this.cardChosenComputed.src = `
            https://art.hearthstonejson.com/v1/render/latest/${this.langChosen}/256x/${this.cardChosenComputed.id}.png`;
          this.ifCardChosen = true;
        }
      }
    },
    changeLanguage(lang) {
      this.langChosen = lang;
    },
    getCardByLang(){
      // this.axios.get(`https://api.hearthstonejson.com/v1/latest/${this.langChosen}/cards.json`)
      // .then(response => {
      //   this.cardArray = response.data;
      // })
      // .catch(e => {
      //   this.$ons.notification.toast(`Something went wrong: ${e}`);
      // })
      // this.$store.commit('updateCards', ['asd','fasf','asds']);
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
    let storage = window.localStorage;
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
</style>
