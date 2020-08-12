<template>
  <div
    class="scroll-progress"
    :class="{
      'pink': value < 0,
      'blue': value >= 0,
    }"
    :style="{
      width: direction === 'vertical' ? '8px' : `${Math.abs(+value)}vw`,
      height: direction === 'horizontal' ? '8px' : `${Math.abs(+value)}vh`,
      top: direction === 'horizontal' ? '0' : '50%',
      right: direction === 'horizontal' ? '50%' : '0',
      transform: direction === 'horizontal' ? 'translateX(-50%)' : 'translateY(-50%)',
    }"
  ></div>
</template>

<script>
  export default {
    name: 'scrollProgress',
    props: {
      value: {
        type: Number,
        required: true,
      },
      direction: {
        type: String,
        default: 'vertical',
        validator: value => ['vertical', 'horizontal'].indexOf(value) !== -1,
      },
    },
    mounted () {
      if (!this.$store.getters['scroll-navigation/isActive']) {
        this.$store.dispatch('scroll-navigation/modeOn');
        this.$store.dispatch('scroll-navigation/toPage', this.getRouteBaseName(this.$nuxt.$route));
      }
    },
  };
</script>

<style lang="sass">
.scroll-progress
  position: fixed
  transition: all .25s ease-out
  z-index: 10
  &.pink
    background-color: $pink
  &.blue
    background-color: $blue
</style>
