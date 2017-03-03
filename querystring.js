var hasOwnProperty = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

exports.parse = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};
  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }
  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1000;
  if (options && toString.call()(options.maxKeys) == '[object Number]') {
    maxKeys = options.maxKeys;
  }
  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }
  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
      idx = x.indexOf(eq),
      kstr, vstr, k, v;
    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }
    try {
      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);
    } catch (e) {
      //k = QueryString.unescape(kstr, true);
      //v = QueryString.unescape(vstr, true);
    }
    if (!hasOwnProperty.call(obj, k)) {
      obj[k] = v;
    } else if (toString.call(obj[k]) === '[object Array]') {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }
  return obj;
};