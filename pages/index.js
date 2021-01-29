import React, { useRef, useCallback, useReducer, useEffect } from "react";
import Footer from "../components/Footer";
import NoteCardList from "../components/NoteCardList";
import SearchFilter from "../components/SearchFilter";
import ScrollTop from "../components/ScrollTop";
import styles from "../styles/Home.module.css";
import { getSubjects } from "../lib/requests";
import { getMetaData } from "./api/meta";
import { handlers } from "../lib/state/actions";
import Meta from "../components/Meta";

export const ApplicationContext = React.createContext({});

export const actions = {
  INCREMENT_PAGE: "inc-page",
  DECREMENT_PAGE: "dec-page",
  START: "start",
  FINISH_QUERY_FETCHING: "finish-query-fetching",
  FINISH_PAGE_FETCHING: "finish-page-fetching",
  FINISH_LOADING: "finish-loading",
  START_LOADING: "start-loading",
  CLEAR_METADATA: "clear-metadata",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_METADATA:
      return handlers.clearMetada(state);
    case actions.INCREMENT_PAGE:
      return handlers.incrementPage(state);
    case actions.DECREMENT_PAGE:
      return handlers.decrementPage(state);
    case actions.START:
      return handlers.start(state, payload);
    case actions.FINISH_QUERY_FETCHING:
      return handlers.finishQueryFetching(state, payload);
    case actions.FINISH_PAGE_FETCHING:
      return handlers.finishPageFetching(state, payload);
    case actions.FINISH_LOADING:
      return handlers.finishLoading(state);
    case actions.START_LOADING:
      return handlers.startLoading(state);
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
        <Meta />

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
        <Footer>
          <div>
            Szeretnél jegyzetet feltölteni? Esetleg hibát találtál?{" "}
            <a target="blank" href="https://github.com/memnote/notes">
              Irány a data repo
            </a>
          </div>
        </Footer>
        <ScrollTop />
      </div>
    </ApplicationContext.Provider>
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
      metaData,
      subjects,
      hasMorePage,
    },
  };
}
