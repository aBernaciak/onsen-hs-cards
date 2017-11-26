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
      <img src="https://eu.battle.net/forums/static/images/game-logos/game-logo-hearthstone.png">
    </div>
     <v-ons-list v-if="ifCardChosen">
      <v-ons-list-header>
        Card
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">{{cardChosen[0].name}}</div>
        <img :src="cardChosen[0].src" alt="" width="256" height="382">
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list v-else>
      <v-ons-list-item>
        <img src="http://media-hearth.cursecdn.com/attachments/39/664/cardback_0.png" alt="">
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list>
      <v-ons-list-header>
        Search for card
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="Search for card by name" float v-model="name">
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <v-ons-button modifier="large" @click="search(name)">Search</v-ons-button>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-action-sheet :visible.sync="actionSheetVisible" cancelable title="Chane language">
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

export default {
  name: 'home',
  data () {
    return {
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
    search(name) {
      console.log(name)
      var array = this.cardArray;
      if (name != '') {
        this.cardChosen = array.filter(function (el) {
          if (el.name == name) {
            return el.name == name;
            this.cardChosen[0].src = `https://art.hearthstonejson.com/v1/render/latest/${this.langChosen}/256x/${this.cardChosen[0].id}.png`;
            this.ifCardChosen = true;
          }
        });
        if (this.cardChosen.length == 0) {
          this.$ons.notification.toast('We couldn\'t find that card.', {timeout: 2000});
        }
      }
      else {
        this.$ons.notification.toast('Input cannot be empty.', {timeout: 2000});
      }
      console.log(this.cardChosen[0])
    },
    getData(obj){
      console.log(obj);
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
<style scoped>
.header {
  text-align: center;
}

img {
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
