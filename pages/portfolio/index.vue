<template>
  <section class="default-container">
    <default-header>
      <template v-slot:header>
        {{ $t('portfolio.header') }}
      </template>
    </default-header>
    <client-only>
      <main class="default-container__content portfolio">
        <portfolio-card
          v-for="card in cards"
          :key="card.id"
          v-bind="card"
        ></portfolio-card>
      </main>
    </client-only>
  </section>
</template>

<script>
  import portfolioCard from '~/components/portfolioCard';

  export default {
    layout: 'portfolio',
    name: 'portfolioPage',
    components: {
      portfolioCard,
    },
    fetch ({$fireDb, store}) {
      $fireDb.ref('/portfolio/').on('value', snapshot => {
        store.dispatch('firebase-managing/clearWorks');
        Object.keys(snapshot.val()).forEach(id => {
          store.dispatch('firebase-managing/pushWork', {
            id,
            ...snapshot.val()[id],
          });
        });
      });
    },
    data () {
      return {

      };
    },
    computed: {
      cards () {
        return this.$store.getters['firebase-managing/works'];
      },
    },
  };
</script>

<style lang="sass">
.portfolio
  display: flex
  flex-direction: row
  flex-wrap: wrap
  & > .portfolio-card
    margin-bottom: 72px
    &:not(:nth-child(4n))
      margin-right: calc((100% - 360px * 4) / 3)
</style>
