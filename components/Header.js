import React from "react";
import { useRouter } from "next/router";
import { normalizeQuery } from "../lib/utils";

const searchIcon = (
  <svg
    className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  </svg>
);

const Header = ({ subjects }) => {
  const router = useRouter();
  const {
    query: { search = "", subject = "" },
  } = router;

  const updateUrl = (search, subject) => {
    router.push(
      { pathname: "/", query: normalizeQuery({ search, subject }) },
      null,
      { shallow: true }
    );
  };

  return (
    <div className="pt-10 pb-3 bg-white px-5">
      <h1 className="text-4xl font-bold">Memnote</h1>
      <p>Hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak.</p>
      <div className="relative w-full mt-4">
        <input
          value={search}
          onChange={(e) => updateUrl(e.target.value, subject)}
          placeholder="Keresés a jegyzetek között"
          type="text"
          className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        {searchIcon}
      </div>
      <select
        name="subject"
        id="subject"
        className="w-full md:hidden mt-2 border-gray-300 rounded-md"
        value={subject ? subject : "all"}
        onChange={(e) =>
          updateUrl(search, e.target.value === "all" ? "" : e.target.value)
        }
      >
        <option value="all">Összes tantárgy</option>
        {Object.keys(subjects).map((key) => {
          return (
            <option key={key} value={key} className="py-2">
              {subjects[key]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Header;
