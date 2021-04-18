import React from "react";
import Meta from "../components/Meta";
import styles from "../styles/Home.module.css";
import { getSubjects } from "../lib/requests";
import { getMetaData } from "./api/meta";

export const SearchContext = React.createContext({});

export default function Home({ metaData, subjects, hasMorePage }) {
  return (
    <>
      <Meta />

      <div className={styles.container}>
        <div>
          {/* TODO: list notes */}

          {metaData.length <= 0 && !loading && (
            <div>
              <h2>Nem található a keresésnek megfelelő jegyzet!</h2>
            </div>
          )}

          {false && (
            <img className={styles.loadingSpinner} src="./loading.gif" />
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const search = query.search;
  const subject = query.subject;

  const rawMetaData = await getMetaData({ page: 1, search, subject });
  const subjects = await getSubjects();
  const metaData = rawMetaData.data;
  const hasMorePage = rawMetaData.pageCount > 1;

  return {
    props: {
      metaData: metaData ? metaData : [],
      subjects,
      hasMorePage,
    },
  };
}
