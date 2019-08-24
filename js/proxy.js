export default (url) => {
  const corsApiHost = 'cors-anywhere.herokuapp.com';
  const corsApiUrl = 'https://' + corsApiHost + '/';
  const origin = window.location.protocol + '//' + window.location.host;
  const targetOrigin = /^https?:\/\/([^/]+)/i.exec(url);
  if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
    targetOrigin[1] !== corsApiHost) {
    return corsApiUrl + url;
  }
  return url;
};
