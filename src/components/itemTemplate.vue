<template>
  <div class="autocomplete-result">
    <strong>{{ item.name }}
      <small class="pull-right" v-if="item.playerClass">
        <span :class="{priest : item.playerClass == 'PRIEST'}"
              :style="{color: classColors[0][item.playerClass]}">

          {{item.playerClass | toLowerCase}}
        </span> - {{item.type | toLowerCase}}
      </small>
    </strong>
    <br>
    <abbr v-html="item.text || 'No description'"></abbr>
    <span class="mana-cost">{{item.cost || ''}}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  },
  data () {
    return {
      classColors: [
        {
          WARLOCK:'#9482C9',
          MAGE: '#69CCF0',
          DRUID: '#FF7D0A ',
          HUNTER: '#00FF96',
          PALADIN: '#F58CBA',
          PRIEST: '#FFFFFF',
          ROGUE: '#FFF569',
          SHAMAN: '#0070DE',
          WARRIOR: '#C79C6E'
        }
      ],
    }
  },
  filters: {
    toLowerCase(value) {
      if (!value) return ''
      var text = value.toLowerCase().split('_');
      for (let i=0; i<text.length; i++) {
        text[i] = text[i].charAt(0).toUpperCase() + text[i].slice(1);
      }
      return text.join(' ');
    }
  },
  destroyed() {
    this.$forceUpdate();
  }
}
</script>

<style scoped lang="scss">
small {
  font-weight: 300;
  font-size: 11px;
  span {
    &.priest {
      text-shadow: 2px 2px 5px rgba(0,0,0,0.8), 0px 0px 2px  rgba(0,0,0,1);
    }
    font-weight: bold;
    letter-spacing: 1px
  }
}
abbr {
  display: block;
  font-size: 13px;
  white-space: nowrap;
  width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.autocomplete-result {
  position: relative;
  height: 38px;
}
.mana-cost {
  position: absolute;
  bottom: -3px;
  right: 0;
  font-size: 15px;
  background: url('../assets/mana.png') no-repeat center center;
  background-size: cover;
  width: 20px;
  height: 20px;
  color: #fff;
  text-align: center;
  line-height: 20px;
  font-weight: bold;
}
</style>
