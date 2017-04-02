<template>
  <div class="vux-x-dialog" @touchmove="onTouchMove">
    <transition :name="maskTransition">
      <div class="weui-mask" @click="hideOnBlur && (currentValue = false)" v-show="currentValue"></div>
    </transition>
    <transition :name="dialogTransition">
      <div class="weui-dialog" v-show="currentValue">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  module.exports = {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      maskTransition: {
        type: String,
        default: 'vux-mask'
      },
      dialogTransition: {
        type: String,
        default: 'vux-dialog'
      },
      hideOnBlur: Boolean,
      scroll: {
        type: Boolean,
        default: true
      }
    },
    created: function created() {
      if (typeof this.value !== 'undefined') {
        this.currentValue = this.value;
      }
    },

    watch: {
      value: {
        handler: function handler(val) {
          this.currentValue = val;
        },
        immediate: true
      },
      currentValue: function currentValue(val) {
        this.$emit(val ? 'on-show' : 'on-hide');
        this.$emit('input', val);
      }
    },
    data: function data() {
      return {
        currentValue: false
      };
    },

    methods: {
      onTouchMove: function onTouchMove(event) {
        !this.scroll && event.preventDefault();
      }
    }
  };
</script>

<style>
  @import '~weuiVux/transition';
  @import '~weuiVux/weui-mask';
  @import './dialog';
</style>
