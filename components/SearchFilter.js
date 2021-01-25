import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { actions, ApplicationContext } from "../pages";
import styles from "../styles/Search.module.css";

function SearchFilter() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [firstRender, setFirstRender] = useState(true);

  const { subjects, hasMore, dispatch, page } = useContext(ApplicationContext);

  useEffect(() => {
    if (query.trim() === "" && subject.trim() === "" && firstRender) return;
    dispatch({ type: actions.SET_META, payload: [] });
  }, [subject]);

  useEffect(() => {
    if (query.trim() === "" && subject.trim() === "" && firstRender) return;
    let cancel;
    dispatch({ type: actions.SET_LOADING, payload: true });
    axios
      .get(`/api/meta?search=${query}&subject=${subject}&page=1`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((metas) => {
        const hasMore = metas.data.pageCount > page;
        dispatch({ type: actions.SET_META, payload: metas.data.data });
        dispatch({ type: actions.SET_PAGE, payload: 1 });
        dispatch({ type: actions.SET_HASMORE, payload: hasMore });
        dispatch({ type: actions.SET_LOADING, payload: false });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
      });

    return () => {
      dispatch({ type: actions.SET_LOADING, payload: false });
      cancel();
    };
  }, [query, subject]);

  useEffect(() => {
    if (!hasMore) return;
    dispatch({ type: actions.SET_LOADING, payload: true });
    axios
      .get(`/api/meta?search=${query}&subject=${subject}&page=${page}`, {
        validateStatus: (status) => status < 400,
      })
      .then((metas) => {
        const hasMore = metas.data.pageCount > page;
        dispatch({ type: actions.SET_HASMORE, payload: hasMore });
        dispatch({ type: actions.ADD_META, payload: metas.data.data });
        dispatch({ type: actions.SET_LOADING, payload: false });
      })
      .catch((err) => {
        // There is nothing here, user probably scrolled like blazing fast
      });
  }, [page]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    <div className={styles.filter}>
      <input
        className={styles.search}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Írj ide a kereséshez..."
      />
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
