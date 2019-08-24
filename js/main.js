import proxy from './proxy.js';
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
  const linkParser = selectParser(
    '.table.table-hover>tbody>tr>td:nth-child(1)>a',
    {attr: 'href'},
  );
  const picParser = selectParser(
    '.table.table-hover>tbody>tr>td:nth-child(1)>a',
    {attr: 'data-thumbnail'},
  );
  const subtitleParser = selectParser(
    '.table.table-hover>tbody>tr>td:nth-child(1)>a',
    {attr: 'data-description'},
  );
  const cardsData = zip(
    await titleParser(dom),
    await linkParser(dom),
    await picParser(dom),
    await subtitleParser(dom)
  ).map(([title, link, pic, subtitle]) => ({title, link, pic, subtitle}));
  const cards = cardsData.map(cardRender);
  return cards.join('');
};

const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
};

const cardRender = ({title, link='#', pic='', subtitle=''}) => {
  const titleEl = textRender('h1', title);
  const picEl = picRender(pic);
  const subtitleEl = textRender('p', subtitle);
  return `
  <div data-href=${link}>
    ${titleEl}
    ${picEl}
    ${subtitleEl}
  </div>`;
};

const textRender = (tag, text) => {
  return `<${tag}>${text}</${tag}>`;
};

const picRender = (pic) => {
  return `<img src=${pic}></img>`;
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

const selectParser = (
  selector,
  {attr, selectAll = true} = {attr: undefined}
) => async (elem) => {
  const nodeListData = await querior(selector, selectAll)(elem);
  const data = [...nodeListData].map((e) => e.getAttr(attr));
  return data;
};

request(
  'GET',
  proxy('https://hocvientruyentranh.net/truyen/all'),
  (html) => Promise.all(
    [
      onDoneShow,
    ].map((cb) => cb(html))
  )
);
