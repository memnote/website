import axios from "axios";
import { useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { normalizeQuery } from "../lib/utils";
import { actions } from "../lib/state/actions";

const useLazyLoading = (hasMore, page, dispatch) => {
  const router = useRouter();

  const {
    query: { search = "", subject = "" },
  } = router;

  const observer = useRef();

  const lastNoteRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch({ type: actions.INCREMENT_PAGE });
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    if (!hasMore) return;
    dispatch({ type: actions.START_LOADING });
    axios
      .get(`/api/meta`, {
        params: normalizeQuery({ search, subject, page }),
        validateStatus: (status) => status < 400,
      })
      .then(({ data: { data: metaDatas, pageCount } }) => {
        dispatch({
          type: actions.FINISH_PAGE_FETCHING,
          payload: { hasMore: pageCount > page, metaDatas },
        });
      })
      .catch((err) => {
        dispatch({ type: actions.FINISH_LOADING });
      });
  }, [page]);

  return lastNoteRef;
};

export default useLazyLoading;
