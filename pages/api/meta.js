import axios from "axios";
import { baseURL, scrapeURL } from "../../lib/baseURLs";
import { cache } from "../../lib/api/cache";

const pageSize = 12;

function extractParams(req) {
  return {
    query: req.query.search === "undefined" ? null : req.query.search,
    subject: req.query.subject === "undefined" ? null : req.query.subject,
    page: req.query.page === "undefined" ? null : req.query.page,
  };
}

function sortDescendent(a, b) {
  const d1 = Date.parse(a.date);
  const d2 = Date.parse(b.date);
  if (d1 > d2) {
    return -1;
  } else if (d2 > d1) {
    return 1;
  }
  return 0;
}

export const getMetaData = async (
  { query, subject, page } = { query: null, subject: null, page: null }
) => {
  let response = [];

  if (cache.hasCache()) {
    response = cache.getAll();
  } else {
    const rawMeta = await axios.get(`${baseURL}/metadata/`, {
      headers: {
        Authorization: `token ${process.env.TOKEN}`,
      },
    });

    const metaDataPromises = rawMeta.data.map(
      (data) =>
        new Promise(async (resolve, reject) => {
          const json = await axios.get(`${scrapeURL}/metadata/${data.name}`);
          const parsedJSON = json.data;
          resolve({
            ...parsedJSON,
            fileName: data.name.replace("-metadata.json", ""),
          });
        })
    );

    response = await Promise.all(metaDataPromises);
    cache.save(response);
  }

  response.sort(sortDescendent);

  if (subject) response = response.filter((post) => post.subject === subject);
  if (query)
    response = response.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

  let pageCount = Math.max(1, Math.ceil(response.length / pageSize));

  if (page) {
    if (page > pageCount) {
      return {
        status: 400,
        message: "Too high page number.",
      };
    }
    if (page <= 0) {
      return {
        status: 400,
        message: "Page number must be bigger than 0.",
      };
    }
    return {
      status: 200,
      pageCount,
      data: response.slice((page - 1) * pageSize, page * pageSize),
    };
  }

  return {
    status: 200,
    data: response,
  };
};

export default async (req, res) => {
  const { query, subject, page } = extractParams(req);

  const response = await getMetaData({ query, subject, page });

  res.statusCode = response.status;
  delete response.status;

  res.json(JSON.stringify(response));
};
