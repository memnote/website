import axios from "axios";
import { scrapeURL } from "./baseURLs";

export async function getNotesMetadata({ query, subject, page }) {
  const rawMeta = await axios.get(
    `/api/meta/?search=${query}&subject=${subject}&page=${page}`
  );
  return rawMeta.data.data;
}

export async function getNoteMarkdown(id) {
  const rawData = await axios.get(`${scrapeURL}/posts/${id}.md`);
  return rawData.data;
}

export async function getSubjects() {
  const raw = await axios.get(`${scrapeURL}/subjects.json`);
  return raw.data;
}

function decodeBase64(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}
