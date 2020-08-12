<template>
  <button
    class="button"
    :class="{
      'button--white': white,
    }"
  >
    <span class="buttontext button__label">
      <slot></slot>
    </span>
  </button>
</template>

<script>
  export default {
    name: 'defaultButton',
    props: {
      white: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style lang="sass">
.button
  display: block
  width: 200px
  height: 54px
  box-sizing: border-box
  border: 8px solid $black
  background: transparent
  color: inherit
  position: relative
  cursor: pointer
  outline: none !important
  &--white
    border: 8px solid $white
  &__label
    z-index: 12
    display: block
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
  &:before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 0
    height: 100%
    transition: all .25s ease-out
    background-color: $black
    z-index: 11
  &:hover:before
    width: 100%
</style>
