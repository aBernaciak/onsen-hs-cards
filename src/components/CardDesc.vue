<template>
  <div class="card-extra-info">
    <div class="card-extra">
      <pre>{{cardPassed.flavor}}</pre>
    </div>
    <div class="card-extra">
      Collectable ?
      <v-ons-icon style="color: green;" icon="fa-check" v-if="cardPassed.collectible"></v-ons-icon>
      <v-ons-icon style="color: red;" icon="fa-times" v-else></v-ons-icon>
    </div>
    <div class="card-extra">
      {{cardPassed.howToEarn}}
      <v-ons-icon style="color: green;" icon="fa-unlock" v-if="cardPassed.howToEarn"></v-ons-icon>
      <br>
      {{cardPassed.howToEarnGolden}}
      <v-ons-icon style="color: gold;" icon="fa-unlock" v-if="cardPassed.howToEarnGolden"></v-ons-icon>
    </div>
    <div class="card-extra">
      <div v-if="cardPassed.set">
        From set: {{ cardPassed.set | extendedSet }}
      </div>
      <div v-if="cardPassed.artist">
        {{cardPassed.name}} art by {{cardPassed.artist}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cardPassed'],
  methods: {
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
}
</script>

<style scoped lang="scss">
pre {
  white-space: normal;
}
.card-extra-info {
  display: block;
  width: 100%;
  .card-extra {
    &:not(:last-child) {
      margin-bottom: 20px;     
    }
  }
}
</style>
