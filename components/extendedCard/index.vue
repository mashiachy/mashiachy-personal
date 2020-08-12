<template>
  <div
    class="extended-card"
    :class="{
      'hovered': hover,
    }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div class="extended-card__content">
      <h1>
        {{ header }}
      </h1>
      <p>
        {{ text }}
      </p>
    </div>
    <div
      v-for="(svgPath, i) in svg"
      :key="i"
      :class="`extended-card__svg-card extended-card__svg-card--${i+1}`"
    >
      <flat-card
        stretch
        filled
        :inner="svgPath"
        :size="150"
      >
      </flat-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "extendedCard",
    props: {
      header: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      svg: {
        type: Array,
        required: true,
      },
    },
    data () {
      return {
        hover: false,
      };
    },
  }
</script>

<style lang="sass">
.extended-card
  display: block
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  cursor: pointer
  &__content
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    max-width: 710px
    width: 90%
    & > *
      width: 100%
      text-align: center
      &:not(:last-child)
        margin-bottom: 31px
  &__svg-card
    position: absolute
    top: 100%
    height: 100%
    width: 33.33%
    @for $i from 1 through 3
      &--#{$i}
        left: #{33.33% * ($i - 1)}
        transition: top .3s ease-out #{($i - 1) * 0.1}s
    &:not(:last-child):after
      content: ''
      position: absolute
      top: 0
      right: 0
      width: 2px
      height: 100%
      background: linear-gradient(180deg, rgba(51, 51, 51, 0) 0%, #F2F2F2 50%, rgba(51, 51, 51, 0) 100%)
  &.hovered &__svg-card
    top: 0
</style>
