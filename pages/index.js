import React, { useEffect, useReducer } from "react";
import Footer from "../components/Footer";
import NoteCardList from "../components/NoteCardList";
import Meta from "../components/Meta";
import styles from "../styles/Home.module.css";
import Hero from "../components/Hero";
import useLazyLoading from "../hooks/useLazyLoading";
import { getSubjects } from "../lib/requests";
import { actions } from "../lib/state/search/actions";
import { actions as historyActions } from "../lib/state/history/actions";
import searchReducer from "../lib/state/search/reducer";
import { getMetaData } from "./api/meta";
import useHistoryContext from "../hooks/useHistoryContext";

export const SearchContext = React.createContext({});

export default function Home({ metaData, subjects, hasMorePage }) {
  const [state, dispatch] = useReducer(searchReducer, {
    page: 1,
    subjects: [],
    hasMore: hasMorePage,
    metaDatas: [],
    loading: false,
  });

  const { metaDatas, hasMore, page, loading } = state;
  const lastNoteRef = useLazyLoading(hasMore, page, dispatch);
  const { dispatch: dispatchHistory } = useHistoryContext();

  useEffect(() => {
    dispatch({
      type: actions.START,
      payload: {
        metaDatas: metaData,
        subjects,
        hasMore: hasMorePage,
      },
    });
    dispatchHistory({ type: historyActions.CLEAR });
  }, []);

  return (
    <SearchContext.Provider
      value={{
        dispatch,
        metaDatas,
        hasMore,
        page,
        subjects,
      }}
    >
      <Meta />

      <div className={styles.container}>
        <Hero />
        <div>
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
      </div>

      <Footer
        text="Szeretnél jegyzetet feltölteni? Esetleg hibát találtál?"
        linkText="Irány a data repo"
        link="https://github.com/memnote/notes"
      />
    </SearchContext.Provider>
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
