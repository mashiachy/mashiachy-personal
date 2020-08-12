<template>
    <nuxt-link
      :to="localePath(path)"
      v-slot="{ navigate, href }"
    >
      <a
        :href="href"
        @click="navigate"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        class="circle-button"
      >
        <div class="circle-button__img">
          <slot :hover="hover"></slot>
        </div>
        <span class="circle-button__label buttontext" v-if="label">{{ label }}</span>
      </a>
    </nuxt-link>
</template>

<script>
  export default {
    name: 'circleButton',
    props: {
      path: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: false,
        default: '',
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
.circle-button
  display: block
  width: 84px
  height: 84px
  border-radius: 50%
  box-sizing: border-box
  border: 4px solid $white
  background-color: $black
  transition: all .25s ease-out
  &:hover
    background-color: $white
  position: relative
  &__img
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    height: 35px
    width: auto
  &__label
    position: absolute
    top: 0
    left: 50%
    transform: translate(-50%, 0)
    opacity: 0
    transition: all .25s ease-out
    pointer-events: none
    color: $white
  &:hover &__label
    top: -32px
    opacity: 1
</style>
