import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

function SearchFilter({
  subjects,
  setMetaDatas,
  page,
  setPage,
  hasMore,
  setHasMore,
}) {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    let cancel;

    axios
      .get(`/api/meta?search=${query}&subject=${subject}&page=1`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((metas) => {
        setMetaDatas(metas.data.data);
        setPage(1);
        setHasMore(metas.data.pageCount > page);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
      });

    return () => cancel();
  }, [query, subject]);

  useEffect(() => {
    if (!hasMore) return;
    axios
      .get(`/api/meta?search=${query}&subject=${subject}&page=${page}`)
      .then((metas) => {
        setMetaDatas((prev) => [...prev, ...metas.data.data]);
        setHasMore(metas.data.pageCount > page);
      });
  }, [page]);

  return (
    <div className={styles.filter}>
      <div className={styles.search}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Írj ide a kereséshez..."
        />
      </div>
      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value="">Válassz tantárgyat</option>
        {Object.entries(subjects).map(([k, v], i) => {
          return (
            <option key={i} value={k}>
              {v}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SearchFilter;
