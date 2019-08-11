import request from './request.js'

const onDoneShow = async (html) => {
  document.getElementById("root").innerHTML =
    `<iframe id="frame" style="border:none;margin:none;width:97vw;height:96vh">${html}<//iframe>`;
  const doc = document.getElementById('frame').contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
}

Element.prototype.getAttr = function(attr) {
  let res;
  switch(attr) {
    case undefined:
    case null:
    case "":
    case "text":
      res = this.innerText;
      break;
    default:
      res = this.getAttribute(attr);
      break;
  }
  return res;
}

const query = (selectAll = true) => dom => selector => {
  if (selectAll) {
    return dom.querySelectorAll(selector);
  } else {
    return [dom.querySelector(selector)];
  }
}

const selectParser = (selector, attr, selectAll = true) => async (html) => {
  const dom = document.createElement('html');
  dom.innerHTML = html;
  const nodeListTitles = query(selectAll)(dom)(selector);
  const titles = [...nodeListTitles].map(title => title.getAttr(attr));
  console.log(titles);
  return titles;
}

request(
  "GET",
  "https://hocvientruyentranh.net/truyen/all",
  html => Promise.all(
    [
      selectParser(".table.table-hover>tbody>tr>td:nth-child(1)>a", "text"),
      onDoneShow,
    ].map(cb => cb(html))
  )
);
