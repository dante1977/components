var LoadingComponent = require('vuxLoading');
var mergeOptions = require('weuiVux/plugin_helper').mergeOptions;

//var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
//  return typeof obj;
//} : function (obj) {
//  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
//};

var $vm = void 0;
var watcher = void 0;

module.exports = {
  install: function install(vue, options) {
    var Loading = vue.extend(LoadingComponent);

    if (!$vm) {
      $vm = new Loading({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }

    var loading = {
      show: function show() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        // destroy watcher
        watcher && watcher();
        if (typeof options === 'string') {
          $vm.text = options;
        } else if (typeof options === 'object') {
          mergeOptions($vm, options);
        }
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.onShow || options.onHide) {
          watcher = $vm.$watch('show', function (val) {
            val && options.onShow && options.onShow($vm);
            val === false && options.onHide && options.onHide($vm);
          });
        }
        $vm.show = true;
      },
      hide: function hide() {
        $vm.show = false;
      }
    };

    // all Vux's plugins are included in this.$vux
    Vue.$vuxLoading = loading;

    vue.mixin({
      created: function created() {
        this.$vuxLoading = vue.$vuxLoading;
      }
    });
  }
};