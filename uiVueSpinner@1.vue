// zhengquanbin 2017.2.18
<template>
  <transition name="fade">
    <div class="ui-vue-spinner" v-if="display">
      <div class="ui-vue-spinner-text">{{ text }}</div>
    </div>
  </transition>
</template>

<script>
  var vueComponentsMixins = require('vueComponentsMixins');

  module.exports = {
    mixins: [vueComponentsMixins],
    name: 'uiVueSpinner',
    data: function () {
      return {
        text: '加载中',
        display: false
      }
    },
    methods: {
      setText: function(text) {
        this.text = text;
      },
      setDisplay: function(display) {
        this.display = display;
      }
    }
  };
</script>

<style>
  @import "~mixins";

  @include keyframes(ui-vue-spinner) {
    from {
      @include rotate(0);
    }
    to {
      @include rotate(360deg);
    }
  }

  .ui-vue-spinner {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 90px;
    height: 90px;
    font-size: 14px;
    line-height: 1.4;
    background-color: rgba(0,0,0,.85);
    @include border-radius(10px);
    @include translate(-50%, -50%);

    &.fade-enter-active, 
    &.fade-leave-active {
      @include transition(opacity .5s);
    }
    &.fade-enter, 
    &.fade-leave-active {
      @include opacity(0);
    }
  }

  .ui-vue-spinner-text {
    display: block;
    position: absolute;
    top: 50%;
    width: 100%;
    padding-top: 46px;
    text-align: center;
    color: rgba(255,255,255,.9);
    @include translate(0, -50%);

    &:before, &:after {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 32px;
      height: 32px;
      margin-left: -16px;
      border: 2px solid rgba(255,255,255,.15);
      @include border-radius(50%);
    }

    &:after {
      border-color: #fff transparent transparent;
      @include animation(ui-vue-spinner .6s linear);
      @include animation-iteration-count(infinite);
    }
  }
</style>
