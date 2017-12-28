<template>
  <v-ons-page class="menu-container">
    <div class="header">
      <v-ons-icon size="90px" icon="fa-cog"></v-ons-icon>
    </div>

    <div class="filters-container" v-for="(filter, index1) in filters">

      <v-ons-list-title class="filter-header" @click="toggleDropdown(index1)">
        {{filter.title}}
        <v-ons-icon class="pull-right"
                    icon="fa-plus"
                    size="20px"
                    :class="{ 'expanded' : filter.expanded }">
        </v-ons-icon>
      </v-ons-list-title>

      <v-ons-list class="expandable-filter"
                  :class="{ expanded: filter.expanded }">

        <v-ons-list-item v-for="(item, index2) in filter.initial" tappable>
          <label class="left">
            <v-ons-checkbox
              v-model='filter.changed'
              :input-id="`checkbox-${index1}-${index2}`"
              :value="item">
            </v-ons-checkbox>
          </label>
          <label class="center" :for="`checkbox-${index1}-${index2}`">
            {{ item | extendedSet | downcase }}
          </label>
        </v-ons-list-item>
      </v-ons-list>
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
      filters: this.$store.state.filters
    }
  },
  methods: {
    updateSwitch(item) {
      this.$store.commit('updateShowRecent', item);
    },
    toggleDropdown(filter) {
      this.filters[filter].expanded = !this.filters[filter].expanded;
    }
  },
  watch: {
    filters: {
      handler(newVal) {
        // const containsAll = (arr1, arr2) => arr2.every(arr2Item => arr1.includes(arr2Item))
        // const sameMembers = (arr1, arr2) => containsAll(arr1, arr2) && containsAll(arr2, arr1);
        this.$store.commit('updateFilters', newVal);
        console.log(this.$store.state.filters)
        // if(sameMembers(newVal.cardSet.changed, newVal.cardSet.initial)) {
        //   this.$store.commit('updateFilters', newVal.cardSet.changed, 'cardSet');
        // }
        // if(sameMembers(newVal.cardClass.changed, newVal.cardClass.initial)) {
        //   this.$store.commit('updateFilters', newVal.cardClass.changed, 'cardClass');
        // }
      },
      deep: true
    }
  },
  filters: {
    downcase(text) {
      let result  = text.toLowerCase().replace(/[_]/g, " ");
      return result.charAt(0).toUpperCase() + result.slice(1);
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
  margin: 20px 0;
}

.page__content {
  overflow: scroll;
  display: none;
}

.filter-header {
  padding-right: 10px;
  ons-icon {
    transition: all ease-in .4s;
    &.expanded {
      &:before {
        content: "\F068";
      }
    }
  }
}

.expandable-filter {
  max-height: 56px;
  transition: max-height cubic-bezier(0.39, 0.58, 0.57, 1) .6s;
  &.expanded {
    max-height: 1000px;
  }
}

img {
  max-width: 100%;
  width: 80%;
}

ons-list-title {
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  background: transparent;
  border: none;
  cursor: default;
  user-select: none;
  font-family: -apple-system, 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  display: block;
  color: #6d6d72;
  text-align: left;
  box-sizing: border-box;
  padding: 0 0 0 16px;
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
}

ons-list-item {
  cursor: pointer;
}
</style>
