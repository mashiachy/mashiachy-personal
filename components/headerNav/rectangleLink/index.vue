<template>
  <span
    :class="{
      'rectangleLink__vertical': direction === 'vertical',
      'rectangleLink__horizontal': direction === 'horizontal',
      'rectangleLink__active': active
    }"
    class="rectangleLink buttontext"
  >
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'rectangleLink',
    props: {
      direction: {
        type: String,
        default: 'vertical',
        validator: value => ['vertical', 'horizontal'].indexOf(value) !== -1,
      },
      active: {
        type: Boolean,
        default: false,
      }
    },
  };
</script>

<style lang="sass">
.rectangleLink
  width: fit-content
  height: fit-content
  display: flex
  justify-content: center
  align-items: center
  color: $white
  transition: all .25s ease-out
  cursor: pointer
  &:before, &:after
    transition: all .25s ease-out
    background-color: $black
  &:hover:before, &:hover:after
    background-color: $white
  &__active
    &:after, &:before
      background-color: $white
  &__vertical
    flex-direction: column
    &:before
      content: ''
      width: 8px
      height: 32px
      margin-bottom: 8px
  &__vertical.rectangleLink__active:before, &__vertical:hover:before
    content: ''
    width: 8px
    height: 48px
  &__horizontal
    flex-direction: row
    &:after
      content: ''
      height: 8px
      width: 32px
      margin-left: 8px
  &__horizontal.rectangleLink__active:after, &__horizontal:hover:after
    content: ''
    height: 8px
    width: 48px
</style>
