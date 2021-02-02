import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { actions, ApplicationContext } from "../pages";
import { normalizeQuery } from "../lib/utils";
import styles from "../styles/Home.module.css";

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
    <div className={styles.searchContainer}>
      <FormControl variant="filled" className={styles.query}>
        <TextField
          value={search}
          onChange={handleSearchChanged}
          variant="filled"
          label="Keresés"
          placeholder="Írj ide a kereséséhez..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <FormControl variant="filled" className={styles.query}>
        <InputLabel id="select-label">Tantárgy</InputLabel>
        <Select
          variant="filled"
          value={subject}
          onChange={handleSubjectChange}
          labelId="select-label"
          id="select"
          style={{ textAlign: "left" }}
        >
          <MenuItem value="">Nincs</MenuItem>
          {Object.entries(subjects).map(([k, v]) => (
            <MenuItem key={k} value={k}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SearchFilter;
