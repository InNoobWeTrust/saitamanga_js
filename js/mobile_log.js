(function () {
  var src = '//cdn.jsdelivr.net/npm/eruda';
  if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true')
    return;
  document.write(`<script src=${src}></script>`);
  document.write('<script>eruda.init();</script>');
})();
