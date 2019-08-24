import proxy from './proxy.js';
import request from './request.js';

const onDoneShow = async (html) => {
  document.getElementById('test').innerHTML = tagRender(
    'h1',
    ['Hello, bug']
  )`class="${Date()[0]}" style="color: red;"`;
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

const interleave = (...arrs) => {
  const maxLen = Math.max.apply(null, arrs.map((a) => a.length));
  return [...Array(maxLen)]
    .map((_, i) => arrs
      .map((a) => a[i])
      .reduce((a, b) => undefined == b ? a : a.concat(b), [])
    )
    .reduce((a, b) => a.concat(b));
};

const cardRender = ({title, link='#', pic='', subtitle=''}) => {
  const titleEl = textRender('h2', title, 'title');
  const picEl = picRender(pic);
  const subtitleEl = textRender('p', subtitle, 'subsubtitle');
  return `
  <div class="card" data-href="${link}">
    ${picEl}
    <div class="container">
      ${titleEl}
      ${subtitleEl}
    </div>
  </div>`;
};

const tagRender = (tag, [...childs]) => ([...tmpls], ...evals) => {
  const attrs = interleave(tmpls, evals);
  return `
  <${tag} ${attrs}>
    ${childs}
  </${tag}>`;
};

const textRender = (tag, text, cls) => {
  return `<${tag} ${undefined != cls ? 'class="' + cls + '"': ''}>${text}</${tag}>`;
};

const picRender = (pic, cls) => {
  return `<img src="${pic}" ${undefined != cls ? 'class="' + cls + '"' : ''}></img>`;
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
  proxy('https://hocvientruyentranh.net/truyen/all'),
  (html) => Promise.all(
    [
      onDoneShow,
    ].map((cb) => cb(html))
  )
);
