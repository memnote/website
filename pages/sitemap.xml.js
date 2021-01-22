import React from "react";
import { cache } from "../lib/api/cache";
import { getMetaData } from "./api/meta";

export default class SiteMap extends React.Component {
  static async getInitialProps({ res }) {
    const urls = (await getMetaData()).data.map(
      (post) => `https://memnote.net/posts/${post.fileName}`
    );
    const updated = new Date(cache.startTime).toISOString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urls.map(
              (url) => `
              <url>
                <loc>${url}</loc>
                <lastmod>${updated}</lastmod>
              </url>`
            )}
            </urlset>
        `;

    console.log(xml);
    res.setHeader("Content-Type", "text/xml");
    res.write(xml);
    res.end();
  }
}
