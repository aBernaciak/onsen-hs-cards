<template>
  <v-ons-page>
    <v-ons-toolbar modifier="transparent"></v-ons-toolbar>
    <div class="header">
      <img src="../assets/onsenui-logo.png">
    </div>

    <v-ons-list-title>Application settings</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="item in recentlySearched">
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

    <div class="filters-container" v-for="filter in filters">
      <v-ons-list-title>
        {{filter.title}}
        <v-ons-icon class="pull-right" icon="fa-chevron-down"></v-ons-icon>
      </v-ons-list-title>
      <v-ons-list class="expandable-filter">
        <v-ons-list-item v-for="(item, $index) in filter.initial">
          <label class="left">
            <v-ons-checkbox
              v-model='filter.changed'
              :input-id="`checkbox-${$index}-${filter.title}`"
              :value="item">
            </v-ons-checkbox>
          </label>
          <label class="center" :for="`checkbox-${$index}-${filter.title}`">
            {{ item | extendedSet }}
          </label>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
      recentlySearched: [
        {
          label: 'Show recent searches',
          icon: 'fa-repeat',
          switchOn: false
        },
      ],
      filters: {
        cardSet: {
          title: 'Card Set Filters',
          initial: this.$store.state.filtersArraySet.initial,
          changed: this.$store.state.filtersArraySet.changed
        },
        cardClass: {
          title: 'Card Class Filters',
          initial: this.$store.state.filtersArrayClass.initial,
          changed: this.$store.state.filtersArrayClass.changed
        }
      }
    }
  },
  methods: {
    updateSwitch(item) {
      this.$store.commit('updateShowRecent', item);
    }
  },
  watch: {
    // 'filters.cardSet.changed'() {
    //   this.$store.commit('updateFilters', this.filters.cardSet.changed);
    // }
    filters: {
      handler(newVal) {
        console.log(newVal.cardSet.changed, newVal.cardSet.changed)
        if(newVal.cardSet.changed != newVal.cardSet.initial) {
          console.log('asd')
        }
      },
      deep: true
    }
  },
  created(){
  }
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
