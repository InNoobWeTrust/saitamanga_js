/*
 * Manga information
 */

import got from 'got';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const chapterElement2Json = (chapter) => {
  const link = chapter.children[0].children[0].href;
  const meta = [...chapter.children].slice(0).map(info => info.textContent);
  return { link, meta };
};

export default async (link) => {
  let response;
  try {
    response = await got(link);
  } catch (error) {
    throw error.response.body;
  }
  const { document } = new JSDOM(response.body).window;
  const cover = document.querySelector(".__info-container>.__left>.__image>img")
    .src;
  const title = document.querySelector(".__info>.__name").textContent;
  const description = document.querySelector(".__info>.__description>p")
    .textContent;
  const meta = [...document.querySelectorAll(".__info>p")]
    .map((item) => item.textContent)
    .join("\n");
  const alert = document.querySelector(".alert.alert-warning")?.textContent;
  const chapters = [
    ...document.querySelectorAll(".box.box-active.auto-height:not(.no-active-href) .table.table-hover>tbody>tr"),
  ].map(chapterElement2Json);
  return { cover, title, description, meta, alert, chapters };
};
