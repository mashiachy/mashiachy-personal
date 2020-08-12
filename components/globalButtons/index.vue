<template>
  <footer class="footer" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="footer__wrapper">
      <nav class="footer__navigation" :class="{'hide': !active}">
        <circle-button
          path="portfolio"
          :label="$t('portfolioLabel')"
          v-slot="{ hover }"
        >
          <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 9.58331H8.75V0.833313H0V9.58331ZM13.125 35.8333H21.875V27.0833H13.125V35.8333ZM0 35.8333H8.75V27.0833H0V35.8333ZM0 22.7083H8.75V13.9583H0V22.7083ZM13.125 22.7083H21.875V13.9583H13.125V22.7083ZM26.25 0.833313V9.58331H35V0.833313H26.25ZM13.125 9.58331H21.875V0.833313H13.125V9.58331ZM26.25 22.7083H35V13.9583H26.25V22.7083ZM26.25 35.8333H35V27.0833H26.25V35.8333Z" :fill="hover ? '#333333' : '#f2f2f2'"/>
          </svg>
        </circle-button>
        <circle-button
          path="resume"
          :label="$t('resumeLabel')"
          v-slot="{ hover }"
        >
          <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 0.5H0V35.5H28V11L17.5 0.5ZM21 28.5H7V25H21V28.5ZM21 21.5H7V18H21V21.5ZM15.75 12.75V3.125L25.375 12.75H15.75Z" :fill="hover ? '#333333' : '#f2f2f2'"/>
          </svg>
        </circle-button>
      </nav>
    </div>
  </footer>
</template>

<script>
  import circleButton from '~/components/globals/circleButton';
  import toggleActiveHover from '~/mixins/toggleActiveHover';

  export default {
    name: 'globalButtons',
    components: {
      circleButton,
    },
    mixins: [toggleActiveHover],
  }
</script>

<style lang="sass">
  .footer
    position: fixed
    bottom: 0
    left: 0
    box-sizing: border-box
    width: 100%
    height: 42px
    padding: 0 100px
    z-index: 10
    &__wrapper
      width: 100%
      position: relative
    &__navigation
      position: absolute
      top: 0
      right: 0
      z-index: 10
      transition: all .25s ease-out
      transform: translate(0, 0)
      width: 197px
      height: 107px
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: flex-start
      &.hide
        transform: translate(0, 42px)
</style>
