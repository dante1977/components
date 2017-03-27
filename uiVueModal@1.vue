// zhengquanbin 2017.2.18
<template>
  <div class="ui-vue-modal" @click="handleOuterClick">
      <div class="ui-vue-modal-dialog">
        <div class="ui-vue-modal-content">
          <a class="ui-vue-modal-close"
             @click="handleClickClose" v-if="closeable">×</a>
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
//  var domUtils = require('domUtils');
  var vueComponentsMixins = require('vueComponentsMixins');

  module.exports = {
    mixins: [vueComponentsMixins],
    props: ['closeable'],
    name: 'uiVueModal',
    data: function () {
      return {
      }
    },
    created: function () {
      if(this.closeable === 'undefined') {
        this.closeable = false;
      }
    },
    methods: {
      handleOuterClick: function (event) {
//        if (!domUtils.contains(this.$el.getElementsByClassName('ui-vue-modal-content')[0], event.srcElement)) {
//          console.log(event)
//        }
      },
      handleClickClose: function () {
      }
    }
  };
</script>

<style>
  @import "~mixins";

  .ui-vue-modal {
    display: table;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: rgba(0,0,0,.5);
    z-index: 100;

    .ui-vue-modal-dialog {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }
  }
  .ui-vue-modal-content {
    display: inline-block;
    position: relative;
    width: 80%;
    height: 200px;
    background-color: #fff;
    border: 1px solid #808080;
    text-align: left;
    @include border-radius(10px);
  }

  .ui-vue-modal-close {
    display: block;
    position: absolute;
    right: 3px;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    @include opacity(20);
  }
</style>
