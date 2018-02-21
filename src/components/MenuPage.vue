<template>
  <v-ons-page class="menu-container">
    <div class="header">
      <v-ons-icon size="90px"
                  icon="fa-cog">

      </v-ons-icon>
    </div>

    <div class="filters-container"
         v-for="(filter, index1) in filters">

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
            <v-ons-checkbox v-model='filter.changed'
                            :input-id="`checkbox-${index1}-${index2}`"
                            :value="item">

            </v-ons-checkbox>
          </label>
          <label class="center"
                 :for="`checkbox-${index1}-${index2}`">

            {{ item | extendedSet | downcase }}
          </label>
        </v-ons-list-item>
      </v-ons-list>
    </div>

    <v-ons-list-title>Application settings</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="item in settings">
        <div class="left">
          <v-ons-icon fixed-width :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ item.label }}
        </div>
        <div class="right">
          <v-ons-switch v-if="item.hasOwnProperty('switchOn')"
                        @change="updateSettings(item.switchOn, item.setting)"
                        v-model="item.switchOn">

          </v-ons-switch>
          <v-ons-icon v-else
                      fixed-width
                      icon="fa-plus"
                      size="30px"
                      @click="item.visible = true">

          </v-ons-icon>

          <v-ons-dialog cancelable
                        :visible.sync="item.visible">

            <div class="credits-container">
              <strong>Hearthstone®</strong>
              <p>
                Hearthstone is a trademark or registered trademark of Blizzard Entertainment, Inc., in the U.S. and/or other countries.
              </p>
              <p>
                Application by
                <a href="https://github.com/aBernaciak/onsen-hs-cards" target="_blank">
                  Aleksy Bernaciak
                </a>
              </p>
            </div>
          </v-ons-dialog>
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
      settings: [
        {
          label: 'Show recent searches',
          icon: 'fa-repeat',
          setting: 'updateShowRecent',
          switchOn: false
        },
        {
          label: 'Show Credits',
          icon: 'fa-registered',
          setting: 'updateShowCredits',
          visible: false,
        },
      ],
      filters: null
    }
  },
  methods: {
    updateSettings(item, setting) {
      this.$store.commit(setting, item);
    },
    toggleDropdown(filter) {
      this.filters[filter].expanded = !this.filters[filter].expanded;
    },
    bindData() {
      let storage = window.localStorage;
      let localFilters = storage.getItem('localFilters');

      if( localFilters != null) {
        this.$store.commit('updateFilters', JSON.parse(localFilters));
        this.filters = this.$store.state.filters;
      }
      else {
        this.filters = this.$store.state.filters;
      }
    }
  },
  watch: {
    filters: {
      handler(newVal) {
        this.$store.commit('updateFilters', newVal);
        window.localStorage.setItem('localFilters', JSON.stringify(this.$store.state.filters));
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
  created() {
    this.bindData();
  }
}
</script>

<style scoped lang="scss">
.credits-container {
  padding: 20px;
}
.header {
  text-align: center;
  margin: 20px 0;
}

.page__content {
  overflow: scroll;
  display: none;
}

.filter-header {
  padding: 5px 10px 5px 16px;
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
  background: #eee;
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
