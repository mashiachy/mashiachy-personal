<template>
  <div class="loading-back">
    <div class="loading-back__wrapper">
      <div class="loading-back__content">
        <span class="loading-back__label buttontext">
          {{ $t('loading') }}
        </span>
        <div class="loading-back__bar">
          <div
            class="loading-back__bar-active"
            :style="{
              transform: `translateX(-${100 - progress * 100}%)`,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'threeLoading',
    props: {
      progress: {
        type: Number,
        required: true,
      },
    },
  }
</script>

<style lang="sass">
.loading-back
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $black
  z-index: 100
  &__wrapper
    position: relative
    width: 100%
    height: 100%
  &__label
    color: $white
    text-align: center
  &__content
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 128px
    height: 48px
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: stretch
  &__bar
    height: 8px
    border: 2px solid $white
    overflow: hidden
  &__bar-active
    width: 100%
    height: 100%
    background-color: $white
    transform: translateX(-100%)
    transition: all .1s linear
</style>
