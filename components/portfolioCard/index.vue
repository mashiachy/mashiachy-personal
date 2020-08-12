<template>
  <div class="portfolio-card">
    <div class="portfolio-card__tags">
      <span
        v-for="(tag, i) in tags"
        :key="`${name}-${tag}-${i}`"
        class="tag codetext"
      >
        {{ tag }}
      </span>
    </div>
    <nuxt-link :to="localePath(`/portfolio/${id}`)" v-slot="{ navigate, href }">
      <a
        class="portfolio-card__header"
        :href="href"
        @click="navigate"
        no-prefetch
      >
        <h3>
          {{ $i18n.locale !== 'ru' && nameEng ? nameEng : name }}
        </h3>
      </a>
    </nuxt-link>
    <span class="portfolio-card__data subtext">
      {{ date }}
    </span>
    <div
      class="portfolio-card__preview"
      :style="{
        backgroundImage: `url('${previewUrl}')`
      }"
    ></div>
  </div>
</template>

<script>
  export default {
    name: "portfolioCard",
    props: {
      id: {
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      nameEng: {
        type: String,
      },
      tags: {
        type: Array,
      },
      date: {
        type: String,
        required: true,
      },
      preview: {
        type: String,
      },
    },
    data () {
      return {
        previewUrl: '',
      };
    },
    mounted () {
      try {
        this.$fireStorage.ref(`/portfolio/${this.id}`).child(this.preview).getDownloadURL().then(url => {
          this.previewUrl = url;
        });
      } catch (e) {
        console.log(e);
      }
    },
  }
</script>

<style lang="sass">
.portfolio-card
  width: 360px
  height: 320px
  position: relative
  & > *
    position: absolute
  &__tags, &__header, &__data
    z-index: 13
  &__tags
    top: 21px
    left: 22px
  &__header
    left: 22px
    right: 22px
    bottom: 56px
  &__data
    left: 22px
    bottom: 6px
  &__preview
    top: 0
    right: 0
    bottom: 0
    left: 150px
    z-index: 12
    background-color: $pink
    background-position: center center
    background-size: auto 100%
    background-repeat: no-repeat
</style>
