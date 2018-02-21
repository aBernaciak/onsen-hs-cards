<template>
  <div class="card-container" :class="{flipped : ifChosen}">
    <img src="../assets/cardback_0.png" alt="" class="card-initial">

    <img :src="imgSrcPassed"
         @error="imageLoadError"
         class="card-flipped"
         :class="{hidden: !ifChosen}"
         v-if="ifChosenPassed">

    <img src="../assets/cardback_0.png" class="card-flipped "alt="" v-else>
  </div>
</template>

<script>
export default {
  props: ['ifChosenPassed', 'imgSrcPassed'],
  data () {
    return {
      ifChosen: this.ifChosenPassed
    }
  },
  methods: {
    imageLoadError(asd) {
      this.$ons.notification.alert('Error: no card art or there is no Internet Connection.');
      this.ifChosen = false;
    },
  },
  watch: {
    ifChosenPassed(newVal){
      this.ifChosen = newVal;
    }
  }
}
</script>

<style scoped lang="scss">
.card-container {
  margin: 0 auto;
  transform: rotateY(0);
  transform-style: preserve-3d;
  transition: all .6s linear;
  width: 256px;
  height: 382px;
  position: relative;
  margin: -30px auto -30px;
  &.flipped {
    transform: rotateY(180deg);
  }
  img {
    &.card-initial {
      position: absolute;
      backface-visibility: hidden;
    }
    &.card-flipped {
      transition: opacity .5s linear;
      transform: rotateY(180deg);
      transform: rotate3d(0, 1, 0, 180deg);
      &.hidden {
        opacity:  0;
      }
    }
  }
}
</style>
