<template>
  <div class="card-extra-info">
    <v-ons-list>
      <v-ons-list-header>
        Card Description
      </v-ons-list-header>
      <v-ons-list-item>
        <pre v-if="cardPassed.flavor">{{cardPassed.flavor}}</pre>
        <p v-else>Card description is not available.</p>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-header>
        Collectable
      </v-ons-list-header>
      <v-ons-list-item>
        <p v-if="cardPassed.collectible"><strong>Yes</strong></p>
        <p v-else><strong>No</strong></p>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-header>
        How to earn Card
      </v-ons-list-header>
      <v-ons-list-item>
        <p v-if="cardPassed.howToEarn"><strong>Normal</strong>: {{cardPassed.howToEarn}}</p>
        <p v-else>How to earn card is not available.</p>

        <p v-if="cardPassed.howToEarnGolden"><strong>Golden Card</strong>: {{cardPassed.howToEarnGolden}}</p>
        <p v-else>How to earn golden card is not available.</p>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-header>
        Card Set
      </v-ons-list-header>
      <v-ons-list-item>
        <p v-if="cardPassed.set">
          <strong>From set</strong>: {{ cardPassed.set | extendedSet }}
        </p>
        <p v-else>Card set is not available.</p>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-header>
        Card Artist
      </v-ons-list-header>
      <v-ons-list-item>
        <p v-if="cardPassed.artist">
          <strong>Card art</strong> by {{cardPassed.artist}}
        </p>
        <p v-else><strong>Card artist</strong> is not available.</p>
      </v-ons-list-item>
    </v-ons-list>

  </div>
</template>

<script>
export default {
  props: ['cardPassed'],
  data () {
    return {
    }
  },
  methods: {
  },
  filters: {
    extendedSet(setName) {
      if (!setName) return ''
      switch(setName) {
        case 'GVG':
          return 'Goblins vs Gnomes';
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
          return setName;
      }
    }
  },
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
