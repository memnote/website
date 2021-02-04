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

function clearMetada(state) {
  return { ...state, metaDatas: [] };
}

function incrementPage(state) {
  return { ...state, page: state.page + 1 };
}

function decrementPage(state) {
  return { ...state, page: state.page + 1 };
}

function start(state, payload) {
  return { ...state, ...payload };
}

function finishQueryFetching(state, { hasMore, metaDatas }) {
  return { ...state, page: 1, loading: false, hasMore, metaDatas };
}

function finishPageFetching(state, { hasMore, metaDatas }) {
  return {
    ...state,
    loading: false,
    hasMore,
    metaDatas: [...state.metaDatas, ...metaDatas],
  };
}

function finishLoading(state) {
  return { ...state, loading: false };
}

function startLoading(state) {
  return { ...state, loading: true };
}

export const handlers = {
  clearMetada,
  incrementPage,
  decrementPage,
  start,
  finishQueryFetching,
  finishPageFetching,
  finishLoading,
  startLoading,
};
