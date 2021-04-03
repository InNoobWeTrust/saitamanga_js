/*
 * List all manga
 */

import got from 'got';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

//const filterTypes = ["name", "view", "latest-chapter", "latest-manga"];

export default async (page, filterType) => {
  let response;
  try {
    response = await got(
      `https://hocvientruyentranh.net/truyen/all?filter_type=${filterType}&page=${page}`
    );
  } catch (error) {
    throw error.response.body;
  }
  const { document } = new JSDOM(response.body).window;
  const paginations = [
    ...document.querySelectorAll("ul.pagination.no-margin>li>a"),
  ];
  const pages = parseInt(paginations[paginations.length - 2].textContent);
  const list = [
    ...document.querySelectorAll(
      ".table.table-hover>tbody>tr>td:first-child>a"
    ),
  ].map((item) =>
    [...item.attributes].reduce((m, attr) => {
      m[attr.name] = attr.value;
      return m;
    }, {})
  );
  return { page, pages, list };
};
