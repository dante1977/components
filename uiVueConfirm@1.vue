// zhengquanbin 2017.2.18
<template>
  <ui-vue-modal :close="false" class="ui-vue-confirm" v-ref="uiVueModal">
    <div class="ui-vue-confirm-content">
      <div class="ui-vue-confirm-text">{{ text }}</div>
    </div>
    <div class="ui-vue-confirm-btn">
      <a @click="handleClickButton('cancel')">取消</a>
      <a @click="handleClickButton('ok')">确认</a>
    </div>
  </ui-vue-modal>
</template>

<script>
  var uiVueModal = require('uiVueModal');
  var vueComponentsMixins = require('vueComponentsMixins');

  module.exports = {
    mixins: [vueComponentsMixins],
    props: ['text'],
    name: 'uiVueConfirm',
    data: function () {
      return {}
    },
    components: {
      uiVueModal: uiVueModal
    },
    methods: {
      setText: function (text) {
        this.text = text;
      },
      handleClickButton: function (event) {
        this.$emit(event);
      }
    }
  };
</script>

<style>
  @import "~mixins";

  .ui-vue-confirm .ui-vue-modal-content {
    width: 270px;
    height: 160px;
    text-align: center;
    background: #f2f2f2;
  @include box-sizing(border-box);
  }

  .ui-vue-confirm-content {
    display: table;
    width: 100%;
    height: 114px;
  }

  .ui-vue-confirm-text {
    display: table-cell;
    vertical-align: middle;
  }

  .ui-vue-confirm-btn {
    color: #333;
    font-size: 15px;

    line-height: 43px;
    border-top: 1px solid #ccc;
  @include clearfix();
  }

  .ui-vue-confirm-btn > a {
    display: block;
    float: left;
    width: 50%;
  }

  .ui-vue-confirm-btn > a:first-child {
    border-right: 1px solid #ccc;
  @include box-sizing(border-box);
  }
</style>