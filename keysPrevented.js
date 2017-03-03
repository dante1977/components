var ccActEnv = require('ccActEnv');

//拖拽等事件
document.body.ondragstart = preventDefault;
document.body.onbeforecopy = preventDefault;

document.onkeypress = preventKeys;
document.onkeydown = preventKeys;

if (ccActEnv.isRelease) {
  document.body.oncontextmenu = preventDefault;
}

function preventDefault(e) {
  e.preventDefault && e.preventDefault();
  return false;
}

function preventKeys(e) {
  var ev = e || window.event;//获取event对象
  var obj = ev.target || ev.srcElement;//获取事件源
  var t = obj.type || obj.getAttribute('type');//获取事件源类型
  if (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") {
    return false;
  }
  if (!(ev.keyCode == 86 && ev.ctrlKey) && !(ev.keyCode == 67 && ev.ctrlKey)
    && (ev.ctrlKey || ev.keyCode == 78 && ev.ctrlKey || ev.altKey || ev.altKey && ev.keyCode == 115)) {
    return false;
  }
}