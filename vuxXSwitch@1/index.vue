<template>
  <input class="weui-switch" type="checkbox" :disabled="disabled" v-model="currentValue"/>
</template>

<script>
export default {
  components: {
  },
  computed: {
  },
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: Boolean,
    value: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    currentValue: function currentValue(val) {
      this.$emit('input', val);
      this.$emit('on-change', val);
    },
    value: function value(val) {
      this.currentValue = val;
    }
  }
}
</script>

<style>
@import './switch';

.weui-cell_switch .weui-cell__ft {
  font-size: 0;
}

input.weui-switch[disabled] {
  opacity: $switch-disabled-opacity;
}

.vux-x-switch.weui-cell_switch {
  padding-top: 6px;
  padding-bottom: 6px;
}
</style>
