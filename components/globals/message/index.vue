<template>
  <span
    class="message"
    :class="`message--${type}`"
  >
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: "message",
    props: {
      type: {
        type: String,
        default: 'info',
      }
    },
  }
</script>

<style lang="sass">
.message
  display: block
  width: 100%
  box-sizing: border-box
  padding: 14px 20px
  text-align: center
  &--info
    background-color: $black
  &--success
    border: 2px solid $blue
  &--error
    border: 2px solid $pink
</style>
