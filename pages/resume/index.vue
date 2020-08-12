<template>
  <section class="default-container resume">
    <header class="default-header">
      <div
        class="default-header__avatar"
        :style="{
          backgroundImage: `url(${avatarImg})`,
        }"
      ></div>
      <div class="default-header__text">
        <div
          class="default-header__arrow-left"
          @mouseenter="arrowHover = true"
          @mouseleave="arrowHover = false"
          @click="$router.go(-1)"
        >
          <svg width="66" height="30" viewBox="0 0 66 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.585785 13.5858C-0.195259 14.3668 -0.195259 15.6332 0.585785 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768156 14.0948 0.0768156 13.3137 0.857864L0.585785 13.5858ZM66 13L2 13V17L66 17V13Z" :fill="arrowHover ? '#333333' : '#f2f2f2'"/>
          </svg>
        </div>
        <h1>
          {{ $t('resume.header') }}
        </h1>
        <h2>
          {{ $t('resume.subheader') }}
        </h2>
      </div>
    </header>
    <main class="default-container__content two-column two-column--extended">
      <div class="resume-block">
        <h2>{{ $t('resume.name.header') }}</h2>
        <article v-html="$t('resume.name.text')"></article>
      </div>
      <div class="resume-block">
        <h2>{{ $t('resume.about.header') }}</h2>
        <article v-html="$t('resume.about.text')"></article>
      </div>
      <div class="resume-block">
        <h2>{{ $t('resume.education.header') }}</h2>
        <h3>{{ $t('resume.education.fLabel') }}</h3>
        <h3>{{ $t('resume.education.fDate') }}</h3>
        <article v-html="$t('resume.education.fText')"></article>
        <h3>{{ $t('resume.education.sLabel') }}</h3>
        <h3>{{ $t('resume.education.sDate') }}</h3>
        <article v-html="$t('resume.education.sText')"></article>
      </div>
      <div class="spacer"></div>
      <div class="resume-block">
        <h2>{{ $t('resume.job.header') }}</h2>
        <h3>{{ $t('resume.job.fLabel') }}</h3>
        <h3>{{ $t('resume.job.fDate') }}</h3>
        <article v-html="$t('resume.job.fText')"></article>
        <h3>{{ $t('resume.job.sLabel') }}</h3>
        <h3>{{ $t('resume.job.sDate') }}</h3>
        <article v-html="$t('resume.job.sText')"></article>
      </div>
      <div class="resume-block">
        <h2>{{ $t('resume.skills.header') }}</h2>
        <div class="resume-block__skills two-column">
          <article
            v-for="article in skillArticles"
            :key="article.header"
          >
            <h3>{{ $t(`resume.skills.${article.header}`) }}</h3>
            <skill
              v-for="skill in article.skills"
              :key="skill[0]"
              :label="skill[0]"
              :value="skill[1]"
            ></skill>
          </article>
        </div>
      </div>
      <div class="resume-block">
        <h2>{{ $t('resume.langs.header') }}</h2>
        <article class="low-width two-column" v-html="$t('resume.langs.text')"></article>
        <default-button class="resume-block__button">PDF</default-button>
      </div>
    </main>
  </section>
</template>

<script>
  import avatarImg from '~/assets/img/avatar.png';
  import skill from '~/components/skill';

  export default {
    head () {
      return {
        title: `Mashiachy | ${this.$i18n.locale === 'ru' ? 'Резюме' : 'Resume'}`,
      };
    },
    layout: 'portfolio',
    name: 'resumePage',
    components: {
      skill,
    },
    data () {
      return {
        arrowHover: false,
        avatarImg,
        skillArticles: [
          {
            header: 'basic',
            skills: [
              ['HTML5', 95],
              ['CSS3', 90],
              ['Javascript', 85],
            ],
          },
          {
            header: 'pro',
            skills: [
              ['Pug', 70],
              ['Sass', 65],
              ['Stylus', 65],
              ['Gulp', 75],
              ['Node.js', 45],
              ['Webpack', 55],
              ['Rollup', 60],
              ['Babel', 50],
              ['Vue', 90],
              ['Nuxt', 80],
              ['React', 20],
              ['Three.js', 70],
            ],
          },
          {
            header: 'programs',
            skills: [
              ['Terminal', 100],
              ['WebStorm', 100],
              ['Figma', 70],
              ['Photoshop', 53],
              ['Illustrator', 50],
              ['Blender', 50],
              ['Chrome', 100],
            ],
          },
          {
            header: 'other',
            skills: [
              ['Python', 70],
              ['C\\C++', 79],
              ['Java', 52],
              ['T-SQL', 81],
              ['PHP', 32],
              ['Math', 100],
            ],
          },
        ],
      };
    },
  };
</script>

<style lang="sass">
.resume
  .default-header
    display: flex
    align-items: stretch
    h2
      color: $black
    &__avatar
      margin-left: calc(#{$w-col})
      width: calc(#{$w-col} * 2 - 20px)
      background-size: auto 100%
      background-position: center
    &__text
      width: calc(#{$w-col} * 5 - 20px)
      margin-left: 20px
      box-sizing: border-box
      padding-top: 200px
    &__arrow-left
      margin-bottom: 40px
      cursor: pointer
  .default-container
    &__content
      margin-top: 120px
      max-height: 1140px
      & > *:not(.spacer)
        display: block
        width: 100%
.two-column
  column-count: 2
  column-gap: 40px
  &--extended
    column-gap: 80px
.spacer
  margin-bottom: 100%
  width: 0 !important
.low-width
  width: 360px
.resume-block
  display: block
  margin-bottom: 64px
  position: relative
  h2
    color: $black
    margin-bottom: 30px
  h3
    margin-bottom: 6px
  article:not(:last-child)
    margin-bottom: 24px
  h3 + h3
    margin-top: -1em
    text-align: right
  &__skills
    max-height: 484px
  &__button
    position: absolute
    right: 0
    bottom: 0
</style>
