var mounted = false;

exports.init = function (host) {
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function (event) {
      var trigger = document.createElement('div');
      var body = document.getElementsByTagName('body')[0];

      trigger.style.display = 'block';
      trigger.style.position = 'absolute';
      trigger.style.left = '0';
      trigger.style.top = '0';
      trigger.style.width = '10px';
      trigger.style.height = '10px';
      trigger.style.zIndex = '9999';
      body.appendChild(trigger);

      trigger.addEventListener('click', function (event) {
        if (!mounted) {
          mounted = true;
          var script = document.createElement('script');
          script.async = true;
          script.src = host + '/target/target-script-min.js#anonymous';
          body.appendChild(script);
        }
      });
    });
  }
};