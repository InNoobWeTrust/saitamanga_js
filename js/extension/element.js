Element.prototype.getAttr = function(attr) {
  let res;
  switch (attr) {
    case undefined:
    case null:
    case "":
      res = this.innerText;
      break;
    default:
      res = this.getAttribute(attr);
      break;
  }
  return res;
};
