import { actions, handlers } from "./actions";

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

export default reducer;
