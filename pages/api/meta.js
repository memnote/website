import axios from "axios";
import { cache } from "../../lib/api/cache";

const query = `
query RepoFiles {
  repository(owner: "memnote", name: "notes") {
    object(expression: "HEAD:metadata") {
      ... on Tree {
        entries { 
          name
          object {
            ... on Blob {
              text
            }
          }
        }
      }
    }
  }
}
`;

const pageSize = 12;

function extractParams(req) {
  return {
    search: req.query.search === "undefined" ? null : req.query.search,
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

async function getMetasWithGraphQL() {
  const rawMeta = await axios.post(
    "https://api.github.com/graphql",
    {
      query,
    },
    {
      headers: {
        Authorization: `token ${process.env.TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  return rawMeta.data.data.repository.object.entries;
}

export const getMetaData = async (
  { search, subject, page } = { search: null, subject: null, page: null }
) => {
  let response = [];
  await new Promise((res, rej) => setTimeout(() => res(), 1000));
  if (cache.hasCache()) {
    response = cache.getAll();
  } else {
    try {
      const rawMeta = await getMetasWithGraphQL();
      response = rawMeta.map((meta) => {
        return {
          fileName: meta.name.replace("-metadata.json", ""),
          ...JSON.parse(meta.object.text),
        };
      });
      cache.save(response);
    } catch (err) {
      return [];
    }
  }

  response.sort(sortDescendent);

  if (subject) response = response.filter((post) => post.subject === subject);
  if (search)
    response = response.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
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
  const { search, subject, page } = extractParams(req);

  const response = await getMetaData({ search, subject, page });

  res.statusCode = response.status;
  delete response.status;

  res.json(JSON.stringify(response));
};
