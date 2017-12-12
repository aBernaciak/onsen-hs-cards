<template>
  <v-ons-page>
    <v-ons-toolbar modifier="transparent"></v-ons-toolbar>
    <div class="header">
      <img src="../assets/onsenui-logo.png">
    </div>

    <v-ons-list-title>Application settings</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="item in switchSettings">
        <div class="left">
          <v-ons-icon fixed-width :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ item.label }}
        </div>
        <div class="right">
          <v-ons-switch @change="updateSwitch(item.switchOn)"
                        v-model="item.switchOn">
          </v-ons-switch>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list-title>Card Set Filters</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="(item, $index) in checkboxSettings">
        <label class="left">
          <v-ons-checkbox
            v-model='filtersArray'
            :input-id="'checkbox-' + $index"
            :value="item">
          </v-ons-checkbox>
        </label>
        <label class="center" :for="'checkbox-' + $index">
          {{ item | extendedSet }}
        </label>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
      switchSettings: [
        {
          label: 'Show recent searches',
          icon: 'fa-repeat',
          switchOn: false
        },
      ],
      checkboxSettings: ['LOOTAPALOOZA', 'GVG', 'TGT', 'OG', 'LOE', 'ICECROWN', 'KARA', 'BRM', 'GANGS', 'UNGORO', 'HOF'],
      filtersArray: this.$store.state.filtersArray
    }
  },
  methods: {
    updateSwitch(item) {
      this.$store.commit('updateShowRecent', item);
    }
  },
  watch: {
    filtersArray() {
      this.$store.commit('updateFilters', this.filtersArray);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  text-align: center;
  margin-bottom: 20px;
}

img {
  max-width: 100%;
  width: 80%;
}

ons-list-item {
  cursor: pointer;
}
</style>
