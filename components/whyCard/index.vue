<template>
  <div
    class="why-card"
  >
    <h1 class="why-card__header">
      {{ header | keyboard(ticker) }}
    </h1>
    <p
      class="why-card__text"
      :class="{
        'why-card__text--shown': ticker >= header.length,
      }"
    >
      {{ text }}
    </p>
  </div>
</template>

<script>
  export default {
    name: "whyCard",
    props: {
      header: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      }
    },
    data () {
      return {
        ticker: 0,
        interval: null,
        keySpeed: 75,
      };
    },
    watch: {
      ticker (v) {
        if (v > this.header.length) {
          clearInterval(this.interval);
        }
      },
    },
    methods: {
      startTick () {
        return new Promise(resolve => {
          this.interval = setInterval(() => {
            if (++(this.ticker) === this.header.length) {
              resolve();
            }
          }, this.keySpeed);
        });
      },
    },
    filters: {
      keyboard: (value, progress) => {
        return value.slice(0, progress);
      },
    },
  }
</script>

<style lang="sass">
.why-card
  display: block
  position: relative
  &:not(:last-child):after
    content: ''
    position: absolute
    top: 0
    right: 0
    width: 1px
    height: 100%
    background: linear-gradient(180deg, rgba(51, 51, 51, 0) 0%, #F2F2F2 50%, rgba(51, 51, 51, 0) 100%)
  &__header
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    word-wrap: break-word
    width: 0.6em
    color: $black
    z-index: 11
    text-align: center
  &__text
    opacity: 0
    position: absolute
    left: 50%
    top: 50%
    z-index: 12
    transform: translate(-50%, calc(-50% + 10px))
    width: 85%
    text-align: center
    transition: all .3s ease-out .3s
    &--shown
      opacity: 1
      transform: translate(-50%, -50%)
</style>
