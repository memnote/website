import "../styles/globals.css";
import { createContext, useEffect, useReducer } from "react";
import Menu from "../components/Menu";
import ScrollTop from "../components/ScrollTop";
import historyReducer from "../lib/state/history/reducer";
import { actions } from "../lib/state/history/actions";

export const HistoryContext = createContext({});

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(historyReducer, { history: [] });

  useEffect(() => {
    (function (history) {
      var pushState = history.pushState;
      history.pushState = function (state) {
        if (!window.location.href.includes("?"))
          dispatch({ type: actions.PUSH });
        return pushState.apply(history, arguments);
      };
    })(window.history);
  }, []);

  return (
    <>
      <Menu />
      <HistoryContext.Provider value={{ dispatch }}>
        <Component {...pageProps} />
      </HistoryContext.Provider>
      <ScrollTop />
    </>
  );
}

export default MyApp;
