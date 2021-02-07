import React from "react";
import { useRouter } from "next/router";
import useQuerySearch from "../hooks/useQuerySearch";
import useSearchContext from "../hooks/useSearchContext";
import { normalizeQuery } from "../lib/utils";
import styles from "../styles/Home.module.css";

function SearchFilter() {
  const router = useRouter();

  const { subjects, dispatch, page } = useSearchContext();
  const { search, subject } = useQuerySearch(dispatch, page, true);

  const push = (search, subject) => {
    router.push(
      { pathname: "/", query: normalizeQuery({ search, subject }) },
      null,
      { shallow: true }
    );
  };

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    push(search, subject);
  };

  const handleSearchChanged = (e) => {
    const search = e.target.value;
    push(search, subject);
  };

  return (
    <div className={styles.searchContainer}>
      <div>
        <input
          className={styles.query}
          type="text"
          value={search}
          onChange={handleSearchChanged}
          placeholder="Írj ide a kereséséhez..."
        />
        <div className={styles.effect} />
      </div>

      <select
        className={styles.query}
        value={subject}
        onChange={handleSubjectChange}
      >
        <option value="">Válassz tantárgyat</option>
        {Object.entries(subjects).map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;
