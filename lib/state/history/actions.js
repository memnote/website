import { useRouter } from "next/router";

function clear(state) {
  return { ...state, history: [] };
}

function push(state) {
  return { ...state, history: [...state.history, window.location.href] };
}

function goBack(state) {
  const { history } = state;
  const router = useRouter();
  if (history.length > 0) {
    const last = history[history.length - 1];
    router.push(last);
    return { ...state, history: [...history.splice(0, history.length - 2)] };
  }
  router.push("/");
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
