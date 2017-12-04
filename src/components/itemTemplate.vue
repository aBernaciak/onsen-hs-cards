<template>
  <div>
    <strong>{{ item.name }} <small class="pull-right">{{item.type | toLowerCase}}</small></strong>
    <br>
  	<!-- <abbr v-html="$options.filters.toOneLine(item.text)"></abbr> -->
    <abbr v-html="item.text"></abbr>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
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
  }
}
</script>

<style scoped>
small {
  font-weight: 300;
  font-size: 11px;
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
