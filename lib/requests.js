import axios from "axios";

const baseURL =
  "https://api.github.com/repos/erikszabo/bprof-notes-data/contents/";

const scrapeURL =
  "https://raw.githubusercontent.com/ErikSzabo/bprof-notes-data/master/";

export async function getAllNotesMetadata() {
  const rawMeta = await axios.get("/api/metadata/");
  return rawMeta.data;
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
