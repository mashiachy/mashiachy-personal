<template>
  <div class="input-field__wrapper">
    <label :for="name"></label>
    <input
      v-if="type !== 'textarea'"
      class="input-field"
      :class="{
        'input-field--valid': valid === 'true',
        'input-field--invalid': valid === 'false',
      }"
      :id="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :required="required"
      @input="$emit('input', $event.target.value)"
    >
    <textarea
      v-else
      class="input-field input-field--textarea"
      :class="{
        'input-field--valid': valid === 'true',
        'input-field--invalid': valid === 'false',
      }"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      :required="required"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <span class="input-field__marker"></span>
  </div>
</template>

<script>
  export default {
    name: "inputField",
    props: {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'text',
      },
      value: {
        default: null,
      },
      placeholder: {
        type: String,
      },
      valid: {
        type: String,
        default: 'null',
      },
      required: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style lang="sass">
.input-field
  display: block
  box-sizing: border-box
  width: 100%
  height: 100%
  margin: 0
  border-radius: 0
  padding: 14px 20px
  background-color: rgba(51, 51, 51, 0.3)
  font-weight: 300
  font-size: 14px
  line-height: 20px
  letter-spacing: 0
  color: $white
  border: 0 !important
  &:focus
    outline: none
  &--textarea
    resize: none
    overflow: auto
  &__wrapper
    position: relative
  &__marker
    position: absolute
    z-index: 11
    top: 0
    left: 0
    width: 0
    height: 1px
    background-color: $white
    opacity: 1
    transition: all .25s ease-out
  &:focus + &__marker, &--valid + &__marker, &--invalid + &__marker
    width: 70%
  &:focus + &__marker
    background-color: $white
  &--valid + &__marker
    background-color: $blue
  &--invalid + &__marker
    background-color: $pink
</style>
