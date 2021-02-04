export const actions = {
  PUSH: "push",
  GO_BACK: "go-back",
  CLEAR: "clear",
};

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
    window.location.href = last;
    return { ...state, history: [...history.splice(0, history.length - 2)] };
  }

  return { ...state };
}

export const handlers = {
  clear,
  push,
  goBack,
};
