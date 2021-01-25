import Head from "next/head";
import React, { useRef, useCallback, useReducer, useEffect } from "react";
import Footer from "../components/Footer";
import NoteCardList from "../components/NoteCardList";
import styles from "../styles/Home.module.css";
import { getSubjects } from "../lib/requests";
import SearchFilter from "../components/SearchFilter";
import { getMetaData } from "./api/meta";
import ScrollTop from "../components/ScrollTop";

export const ApplicationContext = React.createContext({});

export const actions = {
  SET_SUBJECTS: "set-subjects",
  SET_HASMORE: "set-hasmore",
  SET_META: "set-meta",
  ADD_META: "add-meta",
  SET_LOADING: "set-loading",
  INCREMENT_PAGE: "inc-page",
  DECREMENT_PAGE: "dec-page",
  SET_PAGE: "set-page",
  START: "start",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_HASMORE:
      return { ...state, hasMore: action.payload };
    case actions.SET_LOADING:
      return { ...state, loading: action.payload };
    case actions.SET_META:
      return { ...state, metaDatas: action.payload };
    case actions.ADD_META:
      return { ...state, metaDatas: [...state.metaDatas, ...action.payload] };
    case actions.SET_SUBJECTS:
      return { ...state, subjects: action.payload };
    case actions.INCREMENT_PAGE:
      return { ...state, page: state.page + 1 };
    case actions.DECREMENT_PAGE:
      return { ...state, page: state.page - 1 };
    case actions.SET_PAGE:
      return { ...state, page: action.payload };
    case actions.START:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

export default function Home({ metaData, subjects, hasMorePage }) {
  const [state, dispatch] = useReducer(reducer, {
    page: 1,
    subjects: [],
    hasMore: false,
    metaDatas: [],
    loading: false,
  });

  const { metaDatas, hasMore, loading, page } = state;

  useEffect(() => {
    dispatch({
      type: actions.START,
      payload: {
        metaDatas: metaData,
        subjects,
        hasMore: hasMorePage,
      },
    });
  }, []);

  const observer = useRef();

  const lastNoteRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch({ type: actions.INCREMENT_PAGE });
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, hasMorePage]
  );

  return (
    <ApplicationContext.Provider
      value={{
        dispatch,
        metaDatas,
        hasMore,
        loading,
        page,
        subjects: state.subjects,
      }}
    >
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

              <SearchFilter />
            </div>
          </div>

          <div className={styles.main}>
            <NoteCardList refChange={lastNoteRef} />

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
        <ScrollTop />
      </div>
    </ApplicationContext.Provider>
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
