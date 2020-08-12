<template>
  <section class="default-container">
    <default-header
      :preview="previewUrl"
    >
      <template v-slot:tags>
        <span
          v-for="(tag, i) in tags"
          :key="`${name}-${tag}-${i}`"
          class="tag codetext"
        >
          {{ tag }}
        </span>
      </template>
      <template v-slot:header>
        {{ $i18n.locale !== 'ru' && nameEng ? nameEng : name}}
      </template>
      <template v-slot:date>
        {{ date }}
      </template>
    </default-header>
    <main class="portfolio-content">
      <div
        class="portfolio-content__image-wrapper"
        ref="imageWrapper"
        @click="$refs.imageWrapper.classList.toggle('extended')"
      >
        <img
          class="portfolio-content__image"
          :class="{
          'hidden': imageUrl === '',
        }"
          :src="imageUrl"
          :alt="`${name}-image`"
        >
        <div
          class="portfolio-content__mouse"
          :style="{
            backgroundImage: `url(${svgIcon})`
          }"
        ></div>
      </div>
      <div class="portfolio-content__text">
        <h3
          v-if="link"
        >
          <a :href="link">
            {{ link }}
          </a>
        </h3>
        <article class="portfolio-content__article" v-html="$i18n.locale !== 'ru' && articleEng ? articleEng : article"></article>
      </div>
    </main>
  </section>
</template>

<script>
  import svgIcon from '~/assets/img/icons/click.svg';

  export default {
    layout: 'portfolio',
    name: 'portfolioWorkPage',
    asyncData ({ params, $fireDb}) {
      return $fireDb.ref(`/portfolio/${params.id}`).once('value')
        .then(snapshot => {
          return $fireDb.ref(`/portfolio-text/${params.id}`).once('value')
            .then(snap => {
              return {
                id: params.id,
                ...snapshot.val(),
                ...snap.val(),
              };
            });
        });
    },
    data () {
      return {
        previewUrl: '',
        imageUrl: '',
        svgIcon,
      };
    },
    mounted() {
      try {
        this.$fireStorage.ref(`/portfolio/${this.id}/${this.preview}`).getDownloadURL().then(url => {
          this.previewUrl = url;
        });
        this.$fireStorage.ref(`/portfolio/${this.id}/${this.image}`).getDownloadURL().then(url => {
          this.imageUrl = url;
        });
      } catch (e) {
        console.log(e);
      }
    },
  };
</script>

<style lang="sass">
.portfolio-content
  display: flex
  justify-content: space-between
  &__image-wrapper, &__text
    display: block
    width: calc(50% - 10px)
    height: auto
  &__image-wrapper
    overflow: hidden
    height: 1000px
    cursor: pointer
    position: relative
    &:after
      content: ''
      position: absolute
      width: calc(150% + 70px)
      height: 300px
      left: -35px
      bottom: -150px
      background-color: $back
      filter: blur(35px)
    &.extended
      height: auto
      &:after
        content: unset
  &__image-wrapper.extended &__mouse
    display: none
  &__mouse
    z-index: 12
    position: absolute
    bottom: 50px
    left: calc(50% - 16px)
    width: 32px
    height: 32px
    background-size: 32px 32px
  &__image
    width: 100%
    height: auto
    opacity: 1
    transition: opacity .25s ease-out
    &.hidden
      opacity: 0
  &__text
    box-sizing: border-box
    padding: 115px 100px 0
    & > h3
      color: $black
    & > *:not(:last-child)
      margin-bottom: 38px
  &__article
    & > article:not(:last-child)
      margin-bottom: 24px
    ul
      margin: 12px 0
      list-style-type: circle
</style>
