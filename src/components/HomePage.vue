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
          <v-autocomplete :items="itemsSorted"
                          :get-label="getLabel"
                          :component-item='template'
                          v-model='item'
                          :auto-select-one-item="false"
                          @item-selected="itemSelected"
                          @update-items='update'
                          :input-attrs="{name: 'input-test', id: 'v-my-autocomplete', 'class': 'search-input search-input--material'}">
          </v-autocomplete>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="card-container" :class="{flipped : ifCardChosen}">
          <img src="../assets/cardback_0.png" alt="" class="card-initial">

          <img :src="cardChosen[0].src"
               @error="imageLoadError"
               class="card-flipped"
               v-if="ifCardChosen">

          <img src="../assets/cardback_0.png" class="card-flipped "alt="" v-else>
        </div>
      </v-ons-list-item>
      <v-ons-list-item v-if="ifCardChosen">
        <pre>{{cardChosen[0].flavor}}</pre>
        <br>
        <div class="card-extra-info">
          Collectable ?
          <v-ons-icon style="color: green;" icon="fa-check" v-if="cardChosen[0].collectible"></v-ons-icon>
          <v-ons-icon style="color: red;" icon="fa-times" v-else></v-ons-icon>
          <br>
          {{cardChosen[0].howToEarn}}
          <v-ons-icon style="color: green;" icon="fa-unlock" v-if="cardChosen[0].howToEarn"></v-ons-icon>
          <br>
          {{cardChosen[0].howToEarnGolden}}
          <v-ons-icon style="color: gold;" icon="fa-unlock" v-if="cardChosen[0].howToEarnGolden"></v-ons-icon>
        </div>
      </v-ons-list-item>
      <v-ons-list-item v-if="ifCardChosen">
        <div v-if="cardChosen[0].set">
          From set: {{ cardChosen[0].set | extendedSet }}
        </div>
        <div v-if="cardChosen[0].artist">
          {{cardChosen[0].name}} art by {{cardChosen[0].artist}}
        </div>
      </v-ons-list-item>
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

export default {
  name: 'home',
  data () {
    return {
      item: '',
      itemsSorted: [],
      template: ItemTemplate,
      actionSheetVisible: false,
      cardArray: [],
      langArray: ['enUS', 'plPL', 'DeDE'],
      langChosen: 'enUS',
      cardChosen: {},
      ifCardChosen: false,
      name: '',
    }
  },
  methods: {
    imageLoadError() {
      this.$ons.notification.toast('This card doesn\'t have an art or there is no Internet Connection.', {timeout: 2000});
    },
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
          this.cardChosen[0].src = `
            https://art.hearthstonejson.com/v1/render/latest/${this.langChosen}/256x/${this.cardChosen[0].id}.png`;
          this.ifCardChosen = true;
        }
      }
      console.log(this.cardChosen[0])
    },
    changeLanguage(lang) {
      this.langChosen = lang;
    },
    getCardByLang(){
      this.axios.get(`https://api.hearthstonejson.com/v1/latest/${this.langChosen}/cards.json`)
      .then(response => {
        this.cardArray = response.data;
      })
      .catch(e => {
        this.$ons.notification.toast(`Something went wrong: ${e}`);
      })
    },
    onOffline() {
      alert('asd')
    }
  },
  filters: {
    extendedSet(value) {
      if (!value) return ''
      switch(value) {
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
          return 'Whispers of the Old Gods'
        default:
          return value;
      }
    }
  },
  created() {
    if(this.cardArray.length == 0) {
      this.getCardByLang();
    }
    document.addEventListener("offline", this.onOffline, false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  text-align: center;
}

.card-extra-info {
  display: block;
  width: 100%;
}

.card-container {
  margin: 0 auto;
  transform: rotateY(0);
  transform-style: preserve-3d;
  transition: all .6s linear;
  width: 256px;
  height: 382px;
  position: relative;
  margin: -30px auto -30px;
  &.flipped {
    transform: rotateY(180deg);
  }
  img {
    &.card-initial {
      position: absolute;
      backface-visibility: hidden;
    }
    &.card-flipped {
      transition: opacity 0.5s linear;
      transform: rotateY(180deg);
      transform: rotate3d(0, 1, 0, 180deg);
    }
  }
}

.hs-logo {
  max-width: 300px;
  margin: 0 auto;
}

pre {
  white-space: normal;
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
