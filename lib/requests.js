import axios from "axios";
import matter from "gray-matter";
import { scrapeURL } from "./baseURLs";

export async function getNotesMetadata({ query, subject, page }) {
  const rawMeta = await axios.get(
    `/api/meta/?search=${query}&subject=${subject}&page=${page}`
  );
  return rawMeta.data.data;
}

export async function getNoteMarkdown(id) {
  const rawData = await axios.get(`${scrapeURL}/posts/${id}.md`);
  if (rawData.status.toString().startsWith("4")) throw new Error();
  const { content: markdown, data: meta } = matter(rawData.data);
  const metaData = { ...meta, date: meta.date.toISOString() };
  return { markdown, metaData };
}

export async function getSubjects() {
  const res = await axios.get(`${scrapeURL}/subjects.json`);
  return res.data;
}
