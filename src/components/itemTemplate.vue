<template>
  <div>
    <strong>{{ item.name }} <small>{{item.type | toLowerCase}}</small></strong>
    <br>
  	<abbr v-html="$options.filters.toOneLine(item.text)"></abbr>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  },
  filters: {
  	toOneLine(value) {
  		if (!value) return ''
      if (value.length >= 60) {
			 return value.substring(0, 40) + '...';
      }
      else {
        return value;
      }
  	},
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
  abbr {
    font-size: 13px;
  }
</style>
