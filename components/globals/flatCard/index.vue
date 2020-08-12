<template>
  <div
    class="flat-card"
    :class="{
      'stretch': stretch,
      'filled': filled,
    }"
    @mouseenter="reactMouseOn"
    @mouseleave="reactMouseOff"
    @mousemove="mouseMoveListener"
  >
    <div
      class="flat-card__inner"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "flatCard",
    props: {
      stretch: {
        type: Boolean,
        default: false,
      },
      filled: {
        type: Boolean,
        default: false,
      },
      reactMouse: {
        type: Boolean,
        default: false,
      },
      size: {
        type: Number,
        default: 250,
      },
      inner: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        hover: false,
        mouseX: 0,
        mouseY: 0,
        animationId: null,
      };
    },
    mounted () {
      if (this.inner !== '') this.$el.children[0].innerHTML = this.inner;
      this.mouseX = this.$el.clientWidth / 2;
      this.mouseY = this.$el.clientHeight / 2;
      this.defaultPosition();
    },
    methods: {
      defaultPosition () {
        this.$el.children[0].style.top = '50%';
        this.$el.children[0].style.left = '50%';
      },
      reactMouseOn () {
        if (this.reactMouse) this.animationId = window.requestAnimationFrame(this.animate);
      },
      reactMouseOff () {
        if (this.reactMouse) window.cancelAnimationFrame(this.animationId);
        this.defaultPosition();
      },
      mouseMoveListener ({ clientX, clientY }) {
        this.mouseX = clientX - this.$el.getBoundingClientRect().left;
        this.mouseX = this.mouseX >= 0 || this.mouseX <= this.$el.clientWidth ? this.mouseX : this.$el.clientWidth / 2;
        this.mouseY = clientY - this.$el.getBoundingClientRect().top;
        this.mouseY = this.mouseY >= 0 || this.mouseY <= this.$el.clientHeight ? this.mouseY : this.$el.clientHeight / 2;
      },
      animate () {
        this.$el.children[0].style.top = `${48.5 + 3 * (1 - (this.mouseY / this.$el.clientHeight))}%`;
        this.$el.children[0].style.left = `${48.5 + 3 * (1 - (this.mouseX / this.$el.clientWidth))}%`;
        this.animationId = window.requestAnimationFrame(this.animate);
      },
    },
  }
</script>

<style lang="sass">
.flat-card
  position: relative
  &.stretch
    width: 100%
    height: 100%
  &.filled
    background-color: $black
  &__inner
    position: absolute
    transform: translate(-50%, -50%)
    max-width: 80%
    max-height: 80%
    & > *
      height: 100%
      width: auto
      max-width: 100%
      margin-left: auto
      margin-right: auto
    svg
      display: block
</style>
