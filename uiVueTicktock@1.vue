<template>
  <span>{{ mySeconds | formatTime }}</span>
</template>

<script>
  var pad = require('pad');
  var vueComponentsMixins = require('vueComponentsMixins');

  module.exports = {
    name: 'uiVueTicktock',
    mixins: [vueComponentsMixins],
    props: {
      seconds: Number
    },
    data: function () {
      return {
        mySeconds: 0
      };
    },
    filters: {
      formatTime: function (seconds) {
        var s = Math.floor(seconds % 60);
        var h = Math.floor(seconds / 3600);
        var m = Math.floor(seconds / 60 % 60);
        return pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2);
      }
    },
    watch: {
      seconds: function () {
        this.initTickTock();
      }
    },
    created: function () {
      this.initTickTock();
    },
    beforeDestroy: function () {
      if (this._intervalid) {
        clearInterval(this._intervalid);
      }
    },
    methods: {
      initTickTock: function () {
        var self = this;
        if (this._intervalid) {
          clearInterval(this._intervalid);
        }
        this.mySeconds = this.seconds;
        if (this.mySeconds > 0) {
          this._intervalid = setInterval(function () {
            self.mySeconds -= 1;
            if (self.mySeconds <= 0) {
              clearInterval(self._intervalid);
              self.$emit('ended');
            }
          }, 1000);
        }
      }
    }
  };
</script>