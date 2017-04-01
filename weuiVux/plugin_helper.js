var objectAssign = require('objectAssign');

var mergeOptions = function mergeOptions($vm, options) {
  var defaults = {};
  for (var i in $vm.$options.props) {
    if (i !== 'value') {
      defaults[i] = $vm.$options.props[i].default;
    }
  }
  var _options = objectAssign({}, defaults, options);
  for (var _i in _options) {
    $vm[_i] = _options[_i];
  }
};

exports.mergeOptions = mergeOptions;
