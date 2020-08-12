import Vue from 'vue';
import { isMobile, isTablet, isBrowser } from "mobile-device-detect";

const myPlugin = {
  install: function (Vue, options) {
    const isWebGLAvailable = (function () {
      try {
        const canvas = document.createElement('canvas');
        return !! (window.WebGLRenderingContext && ( canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    }) ();

    Vue.mixin ({
      computed: {
        isMobile: () => isMobile,
        isTablet: () => isTablet,
        isBrowser: () => isBrowser,
        isWebGLAvailable: () => isWebGLAvailable,
      },
    });
  },
};

Vue.use(myPlugin);


