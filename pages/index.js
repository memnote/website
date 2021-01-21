import Head from "next/head";
import { useState, useRef, useCallback } from "react";
import Footer from "../components/Footer";
import NoteCardList from "../components/NoteCardList";
import styles from "../styles/Home.module.css";
import { getSubjects } from "../lib/requests";
import SearchFilter from "../components/SearchFilter";
import { getMetaData } from "./api/meta";

export default function Home({ metaData, subjects, hasMorePage }) {
  const [metaDatas, setMetaDatas] = useState(metaData || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(hasMorePage);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const lastNoteRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [setPage, hasMore, hasMorePage]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Memnote</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Memnote</h1>

        <p className={styles.description}>
          Hasznos jegyzetek és segédletek{" "}
          <code className={styles.code}>Üzemmérnök informatikusoknak</code>
        </p>

        <SearchFilter
          setMetaDatas={setMetaDatas}
          subjects={subjects}
          page={page}
          setPage={setPage}
          hasMore={hasMore}
          setHasMore={setHasMore}
          setLoading={setLoading}
        />

        <NoteCardList refChange={lastNoteRef} metaDatas={metaDatas} />
        {metaDatas.length <= 0 && !loading && (
          <div>
            <h2>Nem található a keresésnek megfelelő jegyzet!</h2>
          </div>
        )}
        {loading && (
          <img className={styles.loadingSpinner} src="./loading.gif" />
        )}
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const rawMetaData = await getMetaData({ page: 1 });
  const subjects = await getSubjects();
  const metaData = rawMetaData.data;
  const hasMorePage = rawMetaData.pageCount > 1;

  return {
    props: {
      metaData,
      subjects,
      hasMorePage,
    },
  };
}
