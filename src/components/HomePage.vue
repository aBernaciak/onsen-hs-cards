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
          <v-ons-input placeholder="Search for card by name" float v-model="name" @keyup.enter="search(name)">
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <v-ons-button modifier="large" @click="search(name)">Search</v-ons-button>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="card-container" :class="{flipped : ifCardChosen}">
          <img src="../assets/cardback_0.png" alt="" class="card-initial">
          <img :src="cardChosen[0].src" alt="" class="card-flipped" v-if="ifCardChosen">
          <img src="../assets/cardback_0.png" class="card-flipped "alt="" v-else>
        </div>
      </v-ons-list-item>
      <v-ons-list-item v-if="ifCardChosen">
        {{cardChosen[0].name}} art by {{cardChosen[0].artist}}
        <pre>{{cardChosen[0].flavor}}</pre>
        <br>
        <div class="card-extra-info">
          <v-ons-icon style="color: green;" icon="fa-check" v-if="cardChosen[0].collectible"></v-ons-icon>
          <v-ons-icon style="color: red;" icon="fa-times" v-else></v-ons-icon>
          Collectable
          <br>
          <v-ons-icon style="color: green;" icon="fa-unlock" v-if="cardChosen[0].howToEarn"></v-ons-icon>
          {{cardChosen[0].howToEarn}}
          <br>
          <v-ons-icon style="color: gold;" icon="fa-unlock" v-if="cardChosen[0].howToEarnGolden"></v-ons-icon>
          {{cardChosen[0].howToEarnGolden}}
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <v-autocomplete :items="itemsSorted" :get-label="getLabel" :component-item='template' @update-items='update' v-model='item' keep-open="true" :inputAttrs="{}">
        </v-autocomplete>
      </v-ons-list-item>
      <v-ons-list-item>
        asd
      </v-ons-list-item>
      <v-ons-list-item>
        asdas
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
      item: {id: 9, name: 'Lion', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
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
    update (text) {
      console.log(text)
      var itamz = this.cardArray;
      this.itemsSorted = itamz.filter((item) => {
        console.log(this.toTitleCase(item.name))
        return (new RegExp(this.toTitleCase(text))).test(this.toTitleCase(item.name))
      })
    },
     getLabel (item) {
      return item.name
    },
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    search(name) {
      this.ifCardChosen = false;
      name = this.toTitleCase(name);
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
          this.cardChosen[0].src = `https://art.hearthstonejson.com/v1/render/latest/${this.langChosen}/256x/${this.cardChosen[0].id}.png`;
          this.ifCardChosen = true;
        }
      }
      else {
        this.$ons.notification.toast('Input cannot be empty.', {timeout: 2000});
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
        console.log(e)
      })
    }
  },
  created() {
    this.getCardByLang();
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
