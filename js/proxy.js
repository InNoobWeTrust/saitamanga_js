(function(...args) {
  const corsApiHost = 'cors-anywhere.herokuapp.com';
  const corsApiUrl = 'https://' + corsApiHost + '/';
  const origin = window.location.protocol + '//' + window.location.host;
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    const targetOrigin = /^https?:\/\/([^/]+)/i.exec(args[1]);
    if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
      targetOrigin[1] !== corsApiHost) {
      args[1] = corsApiUrl + args[1];
    }
    return open.apply(this, args);
  };
})();
