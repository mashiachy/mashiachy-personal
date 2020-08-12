<template>
  <div
    class="my-slider"
    :class="{
      'stretch': stretch,
    }"
  >
    <div class="my-slider__carousel-wrapper">
      <div
        class="my-slider__carousel"
        :style="{
        width: `${wSlide * states}px`,
        marginLeft: `${-wSlide * value}px`,
      }"
      >
        <slot></slot>
      </div>
    </div>
    <div
      class="my-slider__controls"
      :style="{
        width: `${states * 120 - 20}px`
      }"
    >
      <div
        v-for="i in Array.from({ length: states }, (v, k) => k)"
        :key="i"
        class="my-slider__control-item"
        :class="{
          'active': i === value,
        }"
        @click="$emit('input', i)"
      ></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mySlider",
    props: {
      stretch: {
        type: Boolean,
        default: false,
      },
      value: {
        type: Number,
        required: true,
      },
    },
    data () {
      return {
        states: 0,
        wSlide: 0,
      };
    },
    mounted () {
      this.wSlide = this.$el.clientWidth;
      const slides = this.$el.getElementsByClassName('my-slider__carousel')[0].children;
      this.states = slides.length;
      for (let slide of slides) {
        slide.style.width = `${this.wSlide}px`;
      }
    },
  }
</script>

<style lang="sass">
.my-slider
  position: relative
  width: 100%
  height: auto
  &.stretch
    width: 100%
    height: 100%
  &.stretch &__carousel-wrapper
    height: 100%
  &.stretch &__carousel
    height: 100%
    align-items: stretch
  &__carousel-wrapper
    position: absolute
    top: 0
    left: 0
    right: 0
    height: auto
    overflow: hidden
  &__carousel
    display: flex
    flex-direction: row
    transition: margin-left .5s ease-out
  &__controls
    position: absolute
    left: 50%
    transform: translateX(-50%)
    bottom: 0
    height: 8px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: stretch
  &__control-item
    display: block
    width: 100px
    background-color: $black
    cursor: pointer
    &:after
      content: ''
      display: block
      height: 100%
      width: 0
      transition: all .25s ease-out
      background-color: $white
    &:hover:after, &.active:after
      width: 100%
</style>
