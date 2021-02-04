import React, { useReducer, useEffect } from "react";
import Footer from "../components/Footer";
import NoteCardList from "../components/NoteCardList";
import Meta from "../components/Meta";
import styles from "../styles/Home.module.css";
import Hero from "../components/Hero";
import useLazyLoading from "../hooks/useLazyLoading";
import { getSubjects } from "../lib/requests";
import { handlers, actions } from "../lib/state/actions";
import { getMetaData } from "./api/meta";

export const ApplicationContext = React.createContext({});

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
    hasMore: hasMorePage,
    metaDatas: [],
    loading: false,
  });

  const { metaDatas, hasMore, loading, page } = state;
  const lastNoteRef = useLazyLoading(hasMore, page, dispatch);

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
      <Footer>
        <div>
          Szeretnél jegyzetet feltölteni? Esetleg hibát találtál?{" "}
          <a target="blank" href="https://github.com/memnote/notes">
            Irány a data repo
          </a>
        </div>
      </Footer>
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
