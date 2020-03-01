import "../extension/element.js";

export const querior = (selector, single = false) => (elem) => {
  if (single) {
    return [elem.querySelector(selector)];
  }
  return elem.querySelectorAll(selector);
};

const selectParser = (selector, { attribute, single = false } = {}) => (elem) => {
  const nodeListData = querior(selector, single)(elem);
  const data = [...nodeListData].map((e) => e.getAttr(attribute));
  return data;
};

export default selectParser;
