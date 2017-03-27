<template>
  <div class="vux-actionsheet">
    <transition name="vux-actionsheet-mask">
      <div class="weui-mask weui-mask_transparent" @click="onClickingMask" v-show="show"></div>
    </transition>
    <div class="weui-actionsheet" :class="{'weui-actionsheet_toggle': show}">
      <div class="weui-actionsheet__menu">
        <div class="weui-actionsheet__cell" v-for="(text, key) in menus" @click="onMenuClick(text, key)"
             v-html="text.label || text" :class="`vux-actionsheet-menu-${text.type || 'default'}`">
        </div>
      </div>
      <div class="weui-actionsheet__action" @click="emitEvent('on-click-menu', 'cancel')" v-if="showCancel">
        <div class="weui-actionsheet__cell">{{cancelText || '取消'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    mounted: function mounted() {
      var _this = this;

      this.$nextTick(function () {
        _this.$tabbar = document.querySelector('.weui-tabbar');
      });
    },

    props: {
      value: Boolean,
      showCancel: Boolean,
      cancelText: String,
      menus: {
        type: [Object, Array],
        default: function _default() {
          return {};
        }
      },
      closeOnClickingMask: {
        type: Boolean,
        default: true
      }
    },
    data: function data() {
      return {
        show: false
      };
    },

    methods: {
      onMenuClick: function onMenuClick(text, key) {
        if (typeof text === 'string') {
          this.emitEvent('on-click-menu', key);
        } else {
          if (text.type !== 'disabled' && text.type !== 'info') {
            if (text.value) {
              this.emitEvent('on-click-menu', text.value);
            } else {
              this.show = false;
            }
          }
        }
      },
      onClickingMask: function onClickingMask() {
        this.closeOnClickingMask && (this.show = false);
      },
      emitEvent: function emitEvent(event, menu) {
        var shouldClose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (event === 'on-click-menu' && !/.noop/.test(menu)) {
          this.$emit(event, menu);
          this.$emit(event + '-' + menu);
          shouldClose && (this.show = false);
        }
      },
      fixIos: function fixIos(zIndex) {
        if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
          this.$tabbar.style.zIndex = zIndex;
        }
      }
    },
    watch: {
      show: function show(val) {
        var _this2 = this;

        this.$emit('input', val);
        if (val) {
          this.fixIos(-1);
        } else {
          setTimeout(function () {
            _this2.fixIos(100);
          }, 200);
        }
      },

      value: {
        handler: function handler(val) {
          this.show = val;
        },
        immediate: true
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.fixIos(100);
    }
  };
</script>

<style>
  @import '../weuiVux/variable';
  @import '../weuiVux/weui-mask';
  @import './actionsheet';

  .vux-actionsheet-gap {
    height: 8px;
    width: 100%;
    background-color: #eee;
  }

  .vux-actionsheet-cancel:before {
    border-top: none;
  }

  .vux-actionsheet-menu-primary {
    color: $actionsheet-label-primary-color;
  }

  .vux-actionsheet-menu-warn {
    color: $actionsheet-label-warn-color;
  }

  .vux-actionsheet-menu-default {
    color: $actionsheet-label-default-color;
  }

  .vux-actionsheet-menu-disabled {
    color: $actionsheet-label-disabled-color;
  }

  .vux-actionsheet-mask-enter, .vux-actionsheet-mask-leave-active {
    opacity: 0;
  }

  .vux-actionsheet-mask-leave-active, .vux-actionsheet-mask-enter-active {
    transition: opacity 300ms;
  }
</style>
