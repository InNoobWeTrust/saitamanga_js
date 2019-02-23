import request from './request.js'
const onDone = (html) => {
  document.getElementById("root").innerHTML =
    `<iframe id="frame" style="border:none;margin:none;width:97vw;height:96vh">${html}<//iframe>`;
  const doc = document.getElementById('frame').contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
}
request("GET", "http://hocvientruyentranh.net", onDone);
