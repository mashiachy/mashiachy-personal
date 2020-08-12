<template>
  <section class="page-container back-blur why">
    <why-card
      v-for="card in cards"
      :key="card.id"
      v-bind="card"
      :ref="card.id"
    ></why-card>
  </section>
</template>

<script>
  import whyCard from '~/components/whyCard';

  export default {
    layout: 'default',
    name: 'whyPage',
    components: {
      whyCard,
    },
    data () {
      return {
        cards: [
          {
            id: 'whyCard1',
            header: this.$t('why.card1.header'),
            text: this.$t('why.card1.text'),
          },
          {
            id: 'whyCard2',
            header: this.$t('why.card2.header'),
            text: this.$t('why.card2.text'),
          },
          {
            id: 'whyCard3',
            header: this.$t('why.card3.header'),
            text: this.$t('why.card3.text'),
          },
          {
            id: 'whyCard4',
            header: this.$t('why.card4.header'),
            text: this.$t('why.card4.text'),
          },
        ],
      };
    },
    mounted () {
      this.$refs.whyCard1[0].startTick()
        .then(() => { return this.$refs.whyCard2[0].startTick(); })
        .then(() => { return this.$refs.whyCard3[0].startTick(); })
        .then(() => { return this.$refs.whyCard4[0].startTick(); });
    },
  };
</script>

<style lang="sass">
.page-container
  &.why
    display: flex
    flex-direction: row
    justify-content: flex-start
    align-items: stretch
    & > *
      width: 25%
</style>
