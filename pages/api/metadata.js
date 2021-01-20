import axios from "axios";
import { baseURL, scrapeURL } from "../../lib/baseURLs";

export default async (req, res) => {
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

  const result = await Promise.all(metaDataPromises);
  res.statusCode = 200;
  res.json(result);
};
