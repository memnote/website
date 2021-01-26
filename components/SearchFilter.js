import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { actions, ApplicationContext } from "../pages";
import { normalizeQuery } from "../lib/utils";
import styles from "../styles/Search.module.css";

function SearchFilter() {
  const [firstRender, setFirstRender] = useState(true);
  const { subjects, hasMore, dispatch, page } = useContext(ApplicationContext);
  const router = useRouter();

  const {
    query: { search = "", subject = "" },
  } = router;

  useEffect(() => {
    if (firstRender) return;
    dispatch({ type: actions.CLEAR_METADATA });
  }, [subject]);

  useEffect(() => {
    if (firstRender) return;
    let cancel;
    dispatch({ type: actions.START_LOADING });
    axios
      .get(`/api/meta`, {
        params: normalizeQuery({ search, subject, page: 1 }),
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then(({ data: { data: metaDatas, pageCount } }) => {
        dispatch({
          type: actions.FINISH_QUERY_FETCHING,
          payload: { hasMore: pageCount > page, metaDatas },
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: actions.FINISH_LOADING });
      });

    return () => {
      dispatch({ type: actions.FINISH_LOADING });
      cancel();
    };
  }, [search, subject]);

  useEffect(() => {
    if (!hasMore) return;
    dispatch({ type: actions.START_LOADING });
    axios
      .get(`/api/meta`, {
        params: normalizeQuery({ search, subject, page }),
        validateStatus: (status) => status < 400,
      })
      .then(({ data: { data: metaDatas, pageCount } }) => {
        dispatch({
          type: actions.FINISH_PAGE_FETCHING,
          payload: { hasMore: pageCount > page, metaDatas },
        });
      })
      .catch((err) => {
        dispatch({ type: actions.FINISH_LOADING });
      });
  }, [page]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    router.push(
      { pathname: "/", query: normalizeQuery({ search, subject }) },
      null,
      { shallow: true }
    );
  };

  const handleSearchChanged = (e) => {
    const search = e.target.value;
    router.push(
      { pathname: "/", query: normalizeQuery({ search, subject }) },
      null,
      { shallow: true }
    );
  };

  return (
    <div className={styles.filter}>
      <input
        value={search}
        className={styles.search}
        onChange={handleSearchChanged}
        type="text"
        placeholder="Írj ide a kereséshez..."
      />
      <select value={subject} onChange={handleSubjectChange}>
        <option value="">Válassz tantárgyat</option>
        {Object.entries(subjects).map(([k, v]) => {
          return (
            <option key={k} value={k}>
              {v}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SearchFilter;
