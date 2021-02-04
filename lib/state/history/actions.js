import Router from "next/router";

function clear(state) {
  return { ...state, history: [] };
}

function push(state) {
  return { ...state, history: [...state.history, window.location.href] };
}

function goBack(state) {
  const { history } = state;
  if (history.length > 0) {
    const last = history[history.length - 1];
    Router.push(last);
    return { ...state, history: [...history.splice(0, history.length - 1)] };
  }
  Router.push("/");
  return { ...state };
}

export const handlers = {
  clear,
  push,
  goBack,
};

export const actions = {
  PUSH: "push",
  GO_BACK: "go-back",
  CLEAR: "clear",
};
