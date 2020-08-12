<template>
  <header
    class="header"
    :class="{
      'header--absolute': absolute,
    }"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <div class="header__wrapper">
      <nav
        class="header__main-navigation"
        :class="{'hide': !active}"
      >
        <nav-link
          v-for="i in ['index', 'who', 'what', 'why', 'how']"
          :key="i"
          :path="i"
        >
          {{ $t('pages.'+i) }}
        </nav-link>
      </nav>
      <nav class="header__sub-navigation" :class="{'hide': !active}">
        <lang-link
          v-for="locale in $i18n.locales"
          :key="locale.code"
          :locale="locale"
        ></lang-link>
      </nav>
    </div>
  </header>
</template>

<script>
  import navLink from '~/components/headerNav/navLink';
  import langLink from '~/components/headerNav/langLink';
  import toggleActiveHover from '~/mixins/toggleActiveHover';

  export default {
    name: 'headerNav',
    props: {
      absolute: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      navLink,
      langLink,
    },
    mixins: [toggleActiveHover],
  };
</script>

<style lang="sass">
.header
  position: fixed
  top: 0
  left: 0
  box-sizing: border-box
  width: 100%
  height: 72px
  padding: 0 100px
  z-index: 10
  &--absolute
    position: absolute
  &__wrapper
    width: 100%
    position: relative
  &__main-navigation
    position: absolute
    top: 0
    left: 50%
    z-index: 10
    transition: all .25s ease-out
    transform: translate(-50%, 0)
    width: 420px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: flex-start
    &.hide
      transform: translate(-50%, -100%)
  &__sub-navigation
    position: absolute
    top: 0
    right: 0
    z-index: 10
    transition: all .25s ease-out
    transform: translate(0, 0)
    width: 126px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: flex-start
    &.hide
      transform: translate(0, -100%)
</style>
