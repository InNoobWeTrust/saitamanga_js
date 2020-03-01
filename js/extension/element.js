Element.prototype.getAttr = function(attr) {
  switch (attr) {
    case undefined:
    case null:
    case "":
      return this.innerText;
    default:
      return this.getAttribute(attr);
  }
};
