<template>
  <p class="skill">
    <span>{{ label }}</span>
    <span class="skill-value">
      <span
        :style="{
          width: `${value}%`
        }"
      ></span>
    </span>
  </p>
</template>

<script>
  export default {
    name: "skill",
    props: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  }
</script>

<style lang="sass">
.skill
  width: 100%
  display: flex
  flex-wrap: nowrap
  justify-content: space-between
  align-items: center
  position: relative
  &-value
    display: block
    position: relative
    width: 60%
    height: 8px
    box-sizing: border-box
    border: 1px solid $white
    & > span
      display: block
      height: 100%
      background-color: $white
</style>
