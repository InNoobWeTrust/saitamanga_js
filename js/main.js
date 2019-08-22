import request from './request.js';

const onDoneShow = async (html) => {
  const dom = document.createElement('html');
  dom.innerHTML = html;
  document.getElementById('root').innerHTML = await galleryRender(dom);
};

const galleryRender = async (dom) => {
  const titleParser = selectParser(
    '.table.table-hover>tbody>tr>td:nth-child(1)>a'
  );
  const titles = await titleParser(dom);
  const lTitles = titles.map((t) => `<p>${t}</p>`).join('');
  return lTitles;
};

Element.prototype.getAttr = function(attr) {
  let res;
  switch (attr) {
  case undefined:
  case null:
  case '':
    res = this.innerText;
    break;
  default:
    res = this.getAttribute(attr);
    break;
  }
  return res;
};

const querior = (selector, selectAll = true) => async (elem) => {
  if (selectAll) {
    return elem.querySelectorAll(selector);
  } else {
    return [elem.querySelector(selector)];
  }
};

const selectParser = (selector, attr, selectAll = true) => async (elem) => {
  const nodeListData = await querior(selector, selectAll)(elem);
  const data = [...nodeListData].map((e) => e.getAttr(attr));
  return data;
};

request(
  'GET',
  'https://hocvientruyentranh.net/truyen/all',
  (html) => Promise.all(
    [
      onDoneShow,
    ].map((cb) => cb(html))
  )
);
