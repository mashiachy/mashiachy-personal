<template>
  <div>
    <three-loading v-show="!threeLoaded" :progress="threeProgress"></three-loading>
    <header-nav></header-nav>
    <client-only>
      <scroll-progress :value="scrollValue" :direction="isBrowser ? 'vertical' : 'horizontal'"></scroll-progress>
    </client-only>
    <global-buttons></global-buttons>
    <client-only>
      <three-man v-if="isWebGLAvailable && isBrowser"></three-man>
      <back-for-pages v-else></back-for-pages>
    </client-only>
    <Nuxt />
  </div>
</template>

<script>
  import globalButtons from '~/components/globalButtons';
  import scrollProgress from '~/components/scrollProgress';
  import headerNav from '~/components/headerNav/index';
  import threeMan from '~/components/threeMan';
  import backForPages from '~/components/backForPages';
  import threeLoading from '~/components/threeLoading';

  export default {
    head () {
      return {
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
      };
    },
    name: 'defaultLayout',
    components: {
      scrollProgress,
      globalButtons,
      headerNav,
      threeMan,
      backForPages,
      threeLoading,
    },
    middleware: ['thdManage'],
    data () {
      return {

      };
    },
    computed: {
      scrollValue () {
        return this.$store.getters['scroll-navigation/value'];
      },
      threeLoaded () {
        return this.$store.getters['three-managing/loaded'];
      },
      threeProgress () {
        return this.$store.getters['three-managing/progress'];
      },
    },
    watch: {
      scrollValue (newValue) {
        if (newValue >= 100) {
          const nextPath = this.$store.getters['scroll-navigation/nextPath'];
          if (nextPath)
            this.$router.push(this.localePath(nextPath));
        } else if (newValue <= -100) {
          const prevPath = this.$store.getters['scroll-navigation/prevPath'];
          if (prevPath)
            this.$router.push(this.localePath(prevPath));
        }
      },
    },
  };
</script>

<style lang="sass">
.page-container
  position: fixed
  z-index: 11
  top: 100px
  left: 100px
  right: 100px
  bottom: 100px
  &.back-blur, .back-blur
    backdrop-filter: blur(35px)
    background: radial-gradient(50% 97.78% at 50% 50%, rgba(86, 91, 96, 0) 0%, #565B60 100%)

.tag
  display: block
  margin: 0
  padding: 0

.background
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  z-index: 1
  &__gradient
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 4
    background: radial-gradient(93.45% 90.46% at 50% 50%, rgba(86, 91, 96, 0) 0%, #333333 100%)
    pointer-events: none
</style>
