<template>
  <div>
    <header-nav absolute></header-nav>
    <Nuxt />
  </div>
</template>

<script>
  import headerNav from '~/components/headerNav/';

  export default {
    head () {
      return {
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
      };
    },
    name: 'portfolioLayout',
    components: {
      headerNav,
    },
  };
</script>

<style lang="sass">
.default-container
  position: static
  z-index: 11
  width: 100%
  padding: 0 100px 100px
  box-sizing: border-box
  min-height: 100vh
  background: radial-gradient(93.45% 90.46% at 50% 50%, rgba(86, 91, 96, 0) 0%, #333333 100%), #565B60
</style>
