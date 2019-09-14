import "../extension/element.js";

export const querior = (selector, selectAll = true) => async (elem) => {
  if (selectAll) {
    return elem.querySelectorAll(selector);
  }
  return [elem.querySelector(selector)];
};

const selectParser = (selector, { attr, selectAll = true } = {}) => async (
  elem
) => {
  const nodeListData = await querior(selector, selectAll)(elem);
  const data = [...nodeListData].map((e) => e.getAttr(attr));
  return data;
};

export default selectParser;
