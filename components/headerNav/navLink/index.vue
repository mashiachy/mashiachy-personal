<template>
  <nuxt-link :to="localePath(path)" v-slot="{ navigate, href, isExactActive }">
    <a :href="href" @click="navigate">
      <rectangle-link
        :direction="isBrowser ? 'vertical' : 'horizontal'"
        :active="isExactActive"
      >
        <slot></slot>
      </rectangle-link>
    </a>
  </nuxt-link>
</template>

<script>
  import rectangleLink from '~/components/headerNav/rectangleLink';

  export default {
    name: "navLink",
    props: {
      path: {
        type: String,
        required: true,
      },
    },
    components: {
      rectangleLink,
    },
  };
</script>

<style lang="sass">
a
  text-decoration: none
  color: inherit
</style>
