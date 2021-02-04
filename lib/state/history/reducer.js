import { actions, handlers } from "./actions";

const reducer = (state, { type }) => {
  switch (type) {
    case actions.GO_BACK:
      return handlers.goBack(state);
    case actions.PUSH:
      return handlers.push(state);
    case actions.CLEAR:
      return handlers.clear(state);
    default:
      return { ...state };
  }
};

export default reducer;
