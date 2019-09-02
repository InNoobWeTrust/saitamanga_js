import proxy from './proxy.js';
import request from './request.js';

import {render} from './ui/base.js';
import Card from './ui/card.js';

import {zip} from './utils/arr_mix.js';

const onDoneShow = async (html) => {
  document.getElementById('test').innerHTML = render({
    tag: 'h1',
    props: {
      class: Date()[0],
      style: 'color: red;'
    }
  },
  'Hello, bug');
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
  ).map(([header, link, thumbnail, details]) => ({header, link, thumbnail, details}));
  const cards = cardsData.map(Card);
  return cards.join('');
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
  {attr, selectAll = true} = {}
) => async (elem) => {
  const nodeListData = await querior(selector, selectAll)(elem);
  const data = [...nodeListData].map((e) => e.getAttr(attr));
  return data;
};

window.onload = () => request(
  'GET',
  proxy('https://hocvientruyentranh.net/truyen/all?filter_type=latest-chapter'),
  (html) => Promise.all(
    [
      onDoneShow,
    ].map((cb) => cb(html))
  )
);
