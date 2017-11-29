<template>
  <div>
    <strong>{{ item.name }}</strong>
  	<p>{{ item.text | toOneLine }}</p>
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
			return value.substring(0, 20) + '...';
  	}
  }
}
</script>
