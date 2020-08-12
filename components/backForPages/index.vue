<template>
  <div class="background">
    <div class="background__gradient"></div>
    <div
      class="background__image"
      :style="{
        backgroundImage: `url('${backImage}')`,
      }"
    ></div>
  </div>
</template>

<script>
  export default {
    name: "backForPages",
    computed: {
      backImage () {
        return `img/background/${this.$routeNumber(this.getRouteBaseName(this.$nuxt.$route))}.jpg`;
      },
    },
  }
</script>

<style lang="sass">
.background__image
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 3
  background-size: 100% auto
  background-position: center center
</style>
