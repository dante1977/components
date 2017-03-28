import map from './arrayMap'
import find from './arrayFind'

export default function (value, list, delimiter) {
  if (value && !list.length) {
    return '';
  }
  if (!delimiter) {
    delimiter = ' ';
  }

  var rs = map(value, function (one, index) {
    if (list.length && Object.prototype.toString.call(list[0]) === '[object Array]') {
      return find(list[index], function (item) {
        return item.value === one;
      });
    } else {
      return find(list, function (item) {
        return item.value === one;
      });
    }
  });

  return map(rs, function (one) {
    return one.name;
  }).join(delimiter).replace('--', '');
};
