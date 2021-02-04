import React from "react";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
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
