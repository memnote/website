import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { actions } from "../lib/state/actions";
import { normalizeQuery } from "../lib/utils";

/**
 * @param dispatch state dispatcher
 * @param page current page of the search
 * @param ssrFirst has server side render at first or not
 */
const useQuerySearch = (dispatch, page, ssrFirst = false) => {
  const [firstRender, setFirstRender] = useState(ssrFirst);

  const {
    query: { search = "", subject = "" },
  } = useRouter();

  useEffect(() => {
    if (firstRender) return;
    dispatch({ type: actions.CLEAR_METADATA });
  }, [subject]);

  useEffect(() => {
    if (firstRender) return;
    let cancel;
    dispatch({ type: actions.START_LOADING });
    axios
      .get(`/api/meta`, {
        params: normalizeQuery({ search, subject, page: 1 }),
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then(({ data: { data: metaDatas, pageCount } }) => {
        dispatch({
          type: actions.FINISH_QUERY_FETCHING,
          payload: { hasMore: pageCount > page, metaDatas },
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: actions.FINISH_LOADING });
      });

    return () => {
      dispatch({ type: actions.FINISH_LOADING });
      cancel();
    };
  }, [search, subject]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return { search, subject };
};

export default useQuerySearch;
