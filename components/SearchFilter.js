import React, { useState, useEffect } from "react";
import { getSubjects } from "../lib/requests";
import styles from "../styles/Home.module.css";

function SearchFilter({ setFilteredMetaDatas, metaDatas = [] }) {
  const [subjects, setSubjects] = useState({});
  const [subjectFilter, setSubjectFilter] = useState("default");

  useEffect(() => {
    getSubjects().then((res) => setSubjects(res));
  }, []);

  const handleSubjectChange = ({ target: { value } }) => {
    setSubjectFilter(value);
    if (value === "default") return setFilteredMetaDatas(metaDatas);
    const filtered = metaDatas.filter((meta) => meta.subject === value);
    setFilteredMetaDatas(filtered);
  };

  const handleSearchChange = (e) => {
    const subjectFiltered =
      subjectFilter !== "default"
        ? metaDatas.filter((meta) => meta.subject === subjectFilter)
        : metaDatas;
    const filtered = subjectFiltered.filter((meta) =>
      meta.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredMetaDatas(filtered);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.search}>
        <input
          onChange={handleSearchChange}
          type="text"
          placeholder="Írj ide a kereséshez..."
        />
      </div>
      <select value={subjectFilter} onChange={handleSubjectChange}>
        <option value="default">Válassz tantárgyat</option>
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
