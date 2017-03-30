var lotteryUrl = require('./fl_lr.swf');
var FlashManager = require('./flashmanager');

module.exports = function (options) {
  options.flashUrl = lotteryUrl;
  return FlashManager.init(options);
};