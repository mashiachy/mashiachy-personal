<template>
  <section class="page-container index">
    <div class="index__wrapper" ref="index-content">
      <div>
        <h1>
          {{ h1 | keyboard(h1Ticker) }}
        </h1>
      </div>
      <div>
        <h2 class="opacity">
          {{ h2 | keyboard(h2Ticker) }}
        </h2>
      </div>
      <nuxt-link :to="localePath('how')" v-slot="{ navigate, href }">
        <a :href="href" @click="navigate">
          <default-button
            class="button-visible hidden"
            ref="landing-button"
            @click.prevent.stop
          >
            {{ $t('index.button') }}
          </default-button>
        </a>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
  export default {
    head () {
      return {
        title: `Mashiachy | ${this.$i18n.locale === 'ru' ? 'Главная' : 'Home'}`,
      };
    },
    layout: 'default',
    name: 'indexPage',
    data () {
      const h1 = this.$t('index.h1');
      const h2 = this.$t('index.h2');
      return {
        h1,
        h1Ticker: 0,
        h1Interval: null,
        h1Max: h1.length,
        h2,
        h2Ticker: 0,
        h2Interval: null,
        h2Max: h2.length,
        keySpeed: 75,
      };
    },
    watch: {
      h1Ticker (v) {
        if (v === this.h1Max) {
          clearInterval(this.h1Interval);
          this.h2Interval = setInterval(() => this.h2Ticker++, this.keySpeed);
        }
      },
      h2Ticker (v) {
        if (v === this.h2Max) {
          clearInterval(this.h2Interval);
          this.$refs['landing-button'].$el.classList.remove('hidden');
        }
      },
      threeLoaded (newValue) {
        if (newValue === true && !this.h1Ticker) this.startViewAnimation();
      },
    },
    computed: {
      threeLoaded () {
        return this.isBrowser && this.isWebGLAvailable ? this.$store.getters['three-managing/loaded'] : true;
      },
    },
    methods: {
      startViewAnimation() {
        setTimeout(() => {
          this.h1Interval = setInterval(() => this.h1Ticker++, this.keySpeed);
        }, 1000);
      },
    },
    filters: {
      keyboard: (value, progress) => {
        return value.slice(0, progress);
      },
    },
    mounted () {
      if ((this.threeLoaded || !this.isWebGLAvailable && !this.isBrowser) && !this.h1Ticker) this.startViewAnimation();
    }
  };
</script>

<style lang="sass">
.page-container.index
  .index
    &__wrapper
      position: relative
      box-sizing: border-box
      width: 100%
      height: 100%
      padding-left: calc(#{$w-col} * 3)
      padding-top: calc(50vh - 204px)
  h1, h2
    display: inline-block
  h1
    margin-bottom: 9px
  h2
    margin-bottom: 52px
    &.opacity
      opacity: .5
.button-visible
  opacity: 1
  transition: all .25s ease-out
  &.hidden
    opacity: 0
</style>
