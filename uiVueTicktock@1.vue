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
    methods: {
      initTickTock: function () {
        if (this._intervalid) {
          clearInterval(this._intervalid);
        }
        this.mySeconds = this.seconds;
        if (this.mySeconds > 0) {
          this._intervalid = setInterval(function () {
            this.mySeconds -= 1;
            if (this.mySeconds <= 0) {
              clearInterval(this._intervalid);
              this.$emit('ended');
            }
          }.bind(this), 1000);
        }
      }
    }
  };
</script>