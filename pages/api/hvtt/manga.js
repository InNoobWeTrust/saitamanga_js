/*
 * Manga information
 */

import crawlManga from '../../../lib/crawl/hvtt/manga';

export default async (req, res) => {
  const link = req.query.link;
  if (typeof link === "undefined") {
    res.status(400).json({ error: "No link provided" });
    return;
  }
  try {
    const data = await crawlManga(link);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
