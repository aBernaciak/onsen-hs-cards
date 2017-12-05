<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
<!--       <div class="right">
        <v-ons-toolbar-button @click="actionSheetVisible = true">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div> -->
    </v-ons-toolbar>

    <div class="header">
      <img src="https://eu.battle.net/forums/static/images/game-logos/game-logo-hearthstone.png" class="hs-logo">
    </div>
    <v-ons-list>
      <v-ons-list-header>
        Card
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-autocomplete v-model='item'
                          :items="itemsSorted"
                          :get-label="getLabel"
                          :component-item='template'
                          :auto-select-one-item="false"
                          @item-selected="itemSelected"
                          @update-items='update'
                          :input-attrs="{ name: 'input-test',
                                         id: 'v-my-autocomplete',
                                         'class': 'search-input search-input--material'}">
          </v-autocomplete>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>

        <CardImage v-bind:ifChosenPassed="ifCardChosen"
                   v-bind:imgSrcPassed="imgChosen">
        </CardImage>

      </v-ons-list-item>

      <CardDesc  v-if="ifCardChosen" v-bind:cardPassed="cardChosenComputed">
      </CardDesc>

    </v-ons-list>

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

export default {
  name: 'home',
  components: {CardImage, CardDesc},
  data () {
    return {
      item: '',
      itemsSorted: [],
      template: ItemTemplate,
      actionSheetVisible: false,
      cardArray: this.$store.state.cardsArray,
      langArray: ['enUS', 'plPL', 'DeDE'],
      langChosen: 'enUS',
      cardChosen: {},
      ifCardChosen: false,
      name: '',
    }
  },
  methods: {
    itemSelected (item) {
      this.ifCardChosen = false;
      this.search(item.name);
    },
    update (text) {
      var itamz = this.cardArray;
      this.itemsSorted = itamz.filter((item) => {
        if(item.name != undefined) {
          return (new RegExp(text.toLowerCase())).test(item.name.toLowerCase())
        }
      })
      this.$forceUpdate();
    },
    getLabel (item) {
      let inputId = document.getElementById('v-my-autocomplete');
      if (inputId.value == '') {
        return item.name;
      }
      else {
        inputId.value = '';
        this.item = '';
        return '';
      }
    },
    search(name) {
      this.ifCardChosen = false;
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
      console.log(this.cardChosenComputed)
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
    }
  },
  created() {
    document.addEventListener("offline", this.onOffline, false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  text-align: center;
}

.hs-logo {
  max-width: 300px;
  margin: 0 auto;
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
