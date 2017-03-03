module.exports = function (purl, ptype) {
  if (purl === undefined) {
    purl = '22';
  }
  if (ptype === undefined) {
    ptype = 0;
  }
  purl += '';
  if (~purl.indexOf("http")) {
    return purl;
  }
  switch (ptype) {
    case 0:
    case 1:
      return '//cc.cottage.netease.com/nsep/headicon/builtin/' + purl;
    case 2:
      return '//cc.cottage.netease.com/nsep/' + purl;
  }
  return purl;
};