/*
 * List all manga
 */

import crawlList from '../../../lib/crawl/hvtt/list.js';

export default async (req, res) => {
  const page = req.query.page || 1;
  const filterType = req.query.filter_type || "latest-chapter";
  try {
    const data = await crawlList(page, filterType);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
