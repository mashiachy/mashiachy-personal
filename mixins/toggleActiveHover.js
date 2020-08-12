export default {
  data () {
    return {
      active: true,
      activeTimeOut: null,
    };
  },
  methods: {
    mouseEnter () {
      this.active = true;
      if (this.activeTimeOut) clearTimeout(this.activeTimeOut);
    },
    mouseLeave () {
      this.activeTimeOut = setTimeout(() => {this.active = false}, 3000);
    },
  },
  mounted () {
    this.mouseLeave();
  },
};
