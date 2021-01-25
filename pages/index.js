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
        <meta httpEquiv="content-language" content="hu" />
        <title>Memnote - Jegyzetek üzemmérnök-informatikusoknak</title>
        <meta
          name="title"
          content="Memnote - Jegyzetek üzemmérnök-informatikusoknak"
        />
        <meta
          name="description"
          content="Bárki által szerkeszthető, bővíthető, hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://memnote.net/" />
        <meta
          property="og:title"
          content="Memnote - Jegyzetek üzemmérnök-informatikusoknak"
        />
        <meta
          property="og:description"
          content="Bárki által szerkeszthető, bővíthető, hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak."
        />
        <meta name="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />

        <meta property="twitter:url" content="https://memnote.net/" />
        <meta
          property="twitter:title"
          content="Memnote - Jegyzetek üzemmérnök-informatikusoknak"
        />
        <meta
          property="twitter:description"
          content="Bárki által szerkeszthető, bővíthető, hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.hero}>
          <div className={styles.heroMain}>
            <h1 className={styles.title}>Memnote</h1>
            <p className={styles.description}>
              Hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak.
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
          </div>
        </div>
        <div className={styles.main}>
          <NoteCardList
            refChange={lastNoteRef}
            subjects={subjects}
            metaDatas={metaDatas}
          />
          {metaDatas.length <= 0 && !loading && (
            <div>
              <h2>Nem található a keresésnek megfelelő jegyzet!</h2>
            </div>
          )}
          {loading && (
            <img className={styles.loadingSpinner} src="./loading.gif" />
          )}
        </div>
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
