var AlertComponent = require('vuxAlert');
var mergeOptions = require('weuiVux/plugin_helper').mergeOptions;

//var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
//  return typeof obj;
//} : function (obj) {
//  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
//};

var $vm = void 0;

module.exports = {
  install: function install(Vue) {
    if (!$vm) {
      var Alert = Vue.extend(AlertComponent);
      $vm = new Alert({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }

    var alert = {
      show: function show() {
        var _this = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (typeof options === 'object') {
          mergeOptions($vm, options);
          if (options.content) {
            $vm.$el.querySelector('.weui-dialog__bd').innerHTML = options['content'];
          }
        } else if (typeof options === 'string') {
          $vm.$el.querySelector('.weui-dialog__bd').innerHTML = options;
        }
        this.watcher && this.watcher();
        this.watcher = $vm.$watch('showValue', function (val) {
          val && options.onShow && options.onShow($vm);
          if (val === false && options.onHide) {
            options.onHide($vm);
            _this.watcher && _this.watcher();
          }
        });
        $vm.showValue = true;
      },
      hide: function hide() {
        $vm.showValue = false;
        this.watcher && this.watcher();
        this.watcher = null;
      }
    };

    Vue.$vuxAlert = alert;

    Vue.mixin({
      created: function created() {
        this.$vuxAlert = Vue.$vuxAlert;
      }
    });
  }
};