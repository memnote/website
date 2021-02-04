import { useContext } from "react";
import { SearchContext } from "../pages";

const useSearchContext = () => {
  return useContext(SearchContext);
};

export default useSearchContext;
