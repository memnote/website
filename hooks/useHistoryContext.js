import { useContext } from "react";
import { HistoryContext } from "../pages/_app";

const useHistoryContext = () => {
  return useContext(HistoryContext);
};

export default useHistoryContext;
