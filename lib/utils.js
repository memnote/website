export function normalizeQuery(query) {
  for (let key in query) {
    if (!query[key]) delete query[key];
  }
  return query;
}
