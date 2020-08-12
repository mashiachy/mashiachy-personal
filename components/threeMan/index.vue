<template>
  <div class="background" ref="canvas-wrapper">
    <div class="background__gradient"></div>
    <canvas class="js__canvas" ref="thd-canvas"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'threeMan',
    data () {
      return {
        initPromise: null,
      };
    },
    created () {
      this.initPromise = this.$store.dispatch('three-managing/init');
    },
    mounted () {
      this.initPromise
        .then(() => {
          this.$store.dispatch('three-managing/show', {
            key: this.$routeNumber(this.getRouteBaseName(this.$nuxt.$route)),
            domElement: this.$refs['thd-canvas'],
          });
        });
    },
  };
</script>

<style lang="sass">
canvas
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 3
</style>
