<template>
  <header class="default-header">
    <div class="default-header__text-content">
      <div
        class="arrow-left"
        @mouseenter="arrowHover = true"
        @mouseleave="arrowHover = false"
        @click="$router.go(-1)"
      >
        <svg width="66" height="30" viewBox="0 0 66 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.585785 13.5858C-0.195259 14.3668 -0.195259 15.6332 0.585785 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768156 14.0948 0.0768156 13.3137 0.857864L0.585785 13.5858ZM66 13L2 13V17L66 17V13Z" :fill="arrowHover ? '#333333' : '#f2f2f2'"/>
        </svg>
      </div>
      <div class="default-header__tags">
        <slot name="tags"></slot>
      </div>
      <h1 class="default-header__header">
        <slot name="header"></slot>
      </h1>
      <span class="default-header__date subtext">
        <slot name="date"></slot>
      </span>
    </div>
    <div
      v-if="preview"
      class="default-header__preview"
      :style="{
        backgroundImage: `url('${preview}')`,
      }"
    ></div>
  </header>
</template>

<script>
  export default {
    name: "defaultHeader",
    props: {
      preview: {
        default: null,
      },
    },
    data () {
      return {
        arrowHover: false,
      };
    },
  }
</script>

<style lang="sass">
.default-header
  height: 576px
  margin-bottom: 20px
  position: relative
  &__text-content
    position: absolute
    z-index: 13
    top: 150px
    left: 50%
    transform: translateX(-50%)
    box-sizing: border-box
    padding: 120px 124px 0
    width: fit-content
  .arrow-left
    position: absolute
    left: 0
    top: 140px
    width: 66px
    height: 30px
    cursor: pointer
  &__tags
    position: absolute
    top: 0
    left: 120px
  &__header
    width: fit-content
    word-wrap: normal
    margin-bottom: 38px
  &__preview
    position: absolute
    z-index: 9
    top: 0
    left: calc(50% + 10px)
    bottom: 0
    width: calc(2 * #{$w-col})
    background-position: center center
    background-size: auto 100%
    background-repeat: no-repeat
</style>
