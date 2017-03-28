<template>
  <div class="vux-flexbox-item" :style="style">
    <slot></slot>
  </div>
</template>

<script>
var prefixList = ['-moz-box-', '-webkit-box-', ''];

export default {
  props: {
    span: [Number, String],
    order: [Number, String]
  },
  methods: {
    buildWidth: function buildWidth(width) {
      if (typeof width === 'number') {
        if (width < 1) {
          return width;
        } else {
          return width / 12;
        }
      } else if (typeof width === 'string') {
        return width.replace('px', '') / this.bodyWidth;
      }
    }
  },
  computed: {
    style: function style() {
      var styles = {};
      var marginName = this.$parent.orient === 'horizontal' ? 'marginLeft' : 'marginTop';
      styles[marginName] = this.$parent.gutter + 'px';

      if (this.span) {
        for (var i = 0; i < prefixList.length; i++) {
          styles[prefixList[i] + 'flex'] = '0 0 ' + this.buildWidth(this.span) * 100 + '%';
        }
      }
      if (typeof this.order !== 'undefined') {
        styles.order = this.order;
      }
      return styles;
    }
  },
  data: function data() {
    return {
      bodyWidth: document.documentElement.offsetWidth
    };
  }
};
</script>
