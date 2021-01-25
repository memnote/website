import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { actions, ApplicationContext } from "../pages";
import styles from "../styles/Search.module.css";

function SearchFilter() {
  const [firstRender, setFirstRender] = useState(true);
  const { subjects, hasMore, dispatch, page } = useContext(ApplicationContext);
  const router = useRouter();

  const {
    query: { search: query = "", subject = "" },
  } = router;

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

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    if (value && query) {
      router.push(
        { pathname: "/", query: { search: query, subject: value } },
        null,
        { shallow: true }
      );
    } else if (value) {
      router.push({ pathname: "/", query: { subject: value } }, null, {
        shallow: true,
      });
    } else if (query) {
      router.push({ pathname: "/", query: { search: query } }, null, {
        shallow: true,
      });
    } else {
      router.push({ pathname: "/" }, null, { shallow: true });
    }
  };

  const handleSearchChanged = (e) => {
    const search = e.target.value;
    if (search && subject) {
      router.push({ pathname: "/", query: { search, subject } }, null, {
        shallow: true,
      });
    } else if (search) {
      router.push({ pathname: "/", query: { search } }, null, {
        shallow: true,
      });
    } else if (subject) {
      router.push({ pathname: "/", query: { subject } }, null, {
        shallow: true,
      });
    } else {
      router.push({ pathname: "/" }, null, { shallow: true });
    }
  };

  return (
    <div className={styles.filter}>
      <input
        value={query}
        className={styles.search}
        onChange={handleSearchChanged}
        type="text"
        placeholder="Írj ide a kereséshez..."
      />
      <select value={subject} onChange={handleSubjectChange}>
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
