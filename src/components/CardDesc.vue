<template>
  <div class="card-extra-info" v-if="ifChosenPassed">
    <v-ons-list>
      <v-ons-list-header>
        Card Description
      </v-ons-list-header>
      <v-ons-list-item>
        <pre>{{cardPassed.flavor || 'Card description is not available.'}}</pre>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-header>
        Collectable
      </v-ons-list-header>
      <v-ons-list-item>
        <strong>{{ cardPassed.collectible || 'False' }}</strong>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-header>
        How to earn Card
      </v-ons-list-header>
      <v-ons-list-item>
        <div>
          Crafting cost of normal card:
            <strong>{{ cardPassed.rarity || 'not available' | extendedRarity}}</strong><br><br>
          Crafting cost of golden card:
            <strong>{{ cardPassed.rarity || 'not available' | extendedRarity(true)}}</strong>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-header>
        Card Set
      </v-ons-list-header>
      <v-ons-list-item>
        <strong>From set</strong>: {{ cardPassed.set || 'not available' | extendedSet }}
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-header>
        Card Artist
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          Card art by<strong>: {{cardPassed.artist || 'not available'}}</strong>
        </div>
      </v-ons-list-item>
    </v-ons-list>

  </div>
</template>

<script>
export default {
  props: ['cardPassed', 'ifChosenPassed'],
  data () {
    return {
      cardsViewed: this.$store.state.cardsViewed
    }
  },
  methods: {
  },
  filters: {
    extendedRarity(rarity, ifGolden) {
      switch(rarity) {
        case 'COMMON':
          return ifGolden ? 400 : 40;
        case 'RARE':
          return ifGolden ? 800 : 100;
        case 'EPIC':
          return ifGolden ? 1600 : 400;
        case 'LEGENDARY':
          return ifGolden ? 3200 : 1600;
        default:
          return rarity;
      }
    },
  },
  watch: {
    ifChosenPassed(val) {
      if (val) {
        this.cardsViewed.push({
          cardName: this.cardPassed
        });
      }
    }
  }
}
</script>

<style scoped lang="scss">
pre {
  white-space: normal;
}
.card-extra-info {
  display: block;
  width: 100%;
}
</style>
