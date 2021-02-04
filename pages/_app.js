import "../styles/globals.css";
import { createContext, useReducer } from "react";
import Menu from "../components/Menu";
import ScrollTop from "../components/ScrollTop";
import historyReducer from "../lib/state/history/reducer";

export const HistoryContext = createContext({});

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(historyReducer, { history: [] });

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
