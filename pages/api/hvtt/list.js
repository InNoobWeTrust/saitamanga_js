/*
 * List all manga
 */

const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const filterTypes = ["name", "view", "latest-chapter", "latest-manga"];

export default async (req, res) => {
  const page = req.query.page || 1;
  const filterType = req.query.filter_type || "latest-chapter";
  let response;
  try {
    response = await got(
      `https://hocvientruyentranh.net/truyen/all?filter_type=${filterType}&page=${page}`
    );
  } catch (error) {
    res.status(500).json({ error: error.response.body });
  }
  const { document } = new JSDOM(response.body).window;
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
  res.status(200).json({ page, list });
};
