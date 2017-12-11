<template>
  <div>
    <strong>{{ itemComputed.name }}
      <small class="pull-right">
        <span :class="{priest : itemComputed.playerClass == 'PRIEST'}"
              :style="{color: classColors[0][itemComputed.playerClass]}">

          {{itemComputed.playerClass | toLowerCase}}
        </span> - {{itemComputed.type | toLowerCase}}
      </small>
    </strong>
    <br>
    <abbr v-html="itemComputed.text"></abbr>
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
      itemComputed: this.item
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
  created () {
    if(this.item.cardName != undefined) {
      this.itemComputed = this.item.cardName;
    }
    else {
      this.itemComputed = this.item;
    }
  },
  destroyed() {
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
  width: 290px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
