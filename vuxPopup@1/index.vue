<template>
  <transition name="vux-popup-animate">
    <div v-show="show" :style="styles" class="vux-popup">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import Popup from './popup';

export default {
  props: {
    value: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    isTransparent: Boolean,
    hideOnBlur: {
      type: Boolean,
      default: true
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      var _this = _this2;
      _this2.popup = new Popup({
        container: _this.$el,
        innerHTML: '',
        hideOnBlur: _this.hideOnBlur,
        onOpen: function onOpen() {
          _this.fixSafariOverflowScrolling('auto');
          _this.show = true;
        },
        onClose: function onClose() {
          _this.show = false;
          if (Object.keys(window.__$vuxPopups).length > 1) return;
          if (document.querySelector('.vux-popup-dialog.vux-popup-mask-disabled')) return;
          setTimeout(function () {
            _this.fixSafariOverflowScrolling('touch');
          }, 300);
        }
      });
      _this2.$overflowScrollingList = document.querySelectorAll('.vux-fix-safari-overflow-scrolling');
    });
  },

  methods: {
    /**
     * https://github.com/airyland/vux/issues/311
     * https://benfrain.com/z-index-stacking-contexts-experimental-css-and-ios-safari/
     */
    fixSafariOverflowScrolling: function fixSafariOverflowScrolling(type) {
      if (!this.$overflowScrollingList.length) return;
      // if (!/iphone/i.test(navigator.userAgent)) return
      for (var i = 0; i < this.$overflowScrollingList.length; i++) {
        this.$overflowScrollingList[i].style.webkitOverflowScrolling = type;
      }
    }
  },
  data: function data() {
    return {
      hasFirstShow: false,
      show: this.value
    };
  },

  computed: {
    styles: function styles() {
      var styles = {
        height: this.height
      };
      if (this.isTransparent) {
        styles['background'] = 'transparent';
      }
      return styles;
    }
  },
  watch: {
    show: function show(val) {
      this.$emit('input', val);
      if (val) {
        this.popup.show();
        this.$emit('on-show');
        this.fixSafariOverflowScrolling('auto');
        if (!this.hasFirstShow) {
          this.$emit('on-first-show');
          this.hasFirstShow = true;
        }
      } else {
        this.$emit('on-hide');
        if (!document.querySelector('.vux-popup-dialog.vux-popup-show')) {
          this.fixSafariOverflowScrolling('touch');
        }
        this.show = false;
        this.popup.hide(false);
      }
    },
    value: function value(val) {
      this.show = val;
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.popup.destroy();
    this.fixSafariOverflowScrolling('touch');
  }
}
</script>

<style>
@import '~weuiVux/variable';

.vux-popup-dialog,.vux-popup {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: $popup-background-color;
  z-index: 501;
  transition-property: transform;
  transition-duration: 300ms;
}
.vux-popup-mask {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  tap-highlight-color: rgba(0,0,0,0);
  z-index: -1;
  transition: opacity 400ms;
}
.vux-popup-mask.vux-popup-show {
  opacity: 1;
}
.vux-popup-animate-transiton {}
.vux-popup-animate-enter {
  transform: translate3d(0, 100%, 0);
}
.vux-popup-animate-leave-active {
  transform: translate3d(0, 100%, 0);
}
</style>
