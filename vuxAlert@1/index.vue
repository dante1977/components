<template>
  <div class="vux-alert">
    <x-dialog
            v-model="showValue"
            :mask-transition="maskTransition"
            :dialog-transition="dialogTransition"
            @on-hide="$emit('on-hide')"
            @on-show="$emit('on-show')">
      <div class="weui-dialog__hd">
        <strong class="weui-dialog__title">{{title}}</strong>
      </div>
      <div class="weui-dialog__bd">
        <slot></slot>
      </div>
      <div class="weui-dialog__ft">
        <a href="javascript:;"
           class="weui-dialog__btn weui-dialog__btn_primary"
           @click="_onHide">{{buttonText || '确认' }}</a>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  var XDialog = require( 'vuxXDialog');

  module.exports = {
    components: {
      XDialog: XDialog
    },
    created: function created() {
      if (typeof this.value !== 'undefined') {
        this.showValue = this.value;
      }
    },

    props: {
      value: Boolean,
      title: String,
      buttonText: String,
      maskTransition: {
        type: String,
        default: 'vux-mask'
      },
      dialogTransition: {
        type: String,
        default: 'vux-dialog'
      }
    },
    data: function data() {
      return {
        showValue: false
      };
    },

    methods: {
      _onHide: function _onHide() {
        this.showValue = false;
      }
    },
    watch: {
      value: function value(val) {
        this.showValue = val;
      },
      showValue: function showValue(val) {
        this.$emit('input', val);
      }
    }
  };
</script>
