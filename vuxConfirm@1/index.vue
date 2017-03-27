<template>
  <div>
    <x-dialog
            v-model="showValue"
            :mask-transition="maskTransition"
            :dialog-transition="dialogTransition"
            :hide-on-blur="hideOnBlur"
            @on-hide="$emit('on-hide')"
            @on-show="$emit('on-show')">
      <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
      <div class="weui-dialog__bd">
        <slot>
          <div v-html="content"></div>
        </slot>
      </div>
      <div class="weui-dialog__ft">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="_onCancel">{{cancelText ||
          '取消'}}</a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="_onConfirm">{{confirmText ||
          '确认'}}</a>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  var XDialog = require('vuxXDialog');

  module.exports = {
    components: {
      XDialog: XDialog
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      hideOnBlur: {
        type: Boolean,
        default: false
      },
      title: String,
      confirmText: String,
      cancelText: String,
      maskTransition: {
        type: String,
        default: 'vux-fade'
      },
      dialogTransition: {
        type: String,
        default: 'vux-dialog'
      },
      content: String
    },
    created: function created() {
      this.showValue = this.show;
      if (this.value) {
        this.showValue = this.value;
      }
    },

    watch: {
      value: function value(val) {
        this.showValue = val;
      },
      showValue: function showValue(val) {
        this.$emit('input', val);
      }
    },
    data: function data() {
      return {
        showValue: false
      };
    },

    methods: {
      _onConfirm: function _onConfirm() {
        this.showValue = false;
        this.$emit('on-confirm');
      },
      _onCancel: function _onCancel() {
        this.showValue = false;
        this.$emit('on-cancel');
      }
    }
  };
</script>