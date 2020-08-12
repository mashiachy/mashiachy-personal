<template>
  <nuxt-link :to="switchLocalePath(locale.code)" v-slot="{ navigate, href }">
    <a :href="href" @click="navigate">
      <rectangle-link
        :direction="isBrowser ? 'vertical' : 'horizontal'"
        :active="locale.code === $i18n.locale"
      >
        {{ locale.code | firstUp }}
      </rectangle-link>
    </a>
  </nuxt-link>
</template>

<script>
  import rectangleLink from '~/components/headerNav/rectangleLink';

  export default {
    name: "langLink",
    props: {
      locale: {
        type: Object,
        required: true,
      },
    },
    components: {
      rectangleLink,
    },
    filters: {
      firstUp: value => value[0].toUpperCase() + value.slice(1),
    },
  };
</script>

<style lang="sass">
  a
    text-decoration: none
    color: inherit
</style>
