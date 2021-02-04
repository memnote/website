import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/LinkRenderer.module.css";
import useHistoryContext from "../hooks/useHistoryContext";
import { actions } from "../lib/state/history/actions";

function LinkRenderer(props) {
  const router = useRouter();
  const { dispatch } = useHistoryContext();
  const url = props.node.url;
  const path = url.includes("memnote")
    ? url.replace("https://memnote.net/posts", "/posts")
    : url;

  const handleClick = () => {
    if (!url.includes("memnote")) {
      return window.open(path, "blank");
    }
    dispatch({ type: actions.PUSH });
    router.push(path);
  };

  return (
    <a className={styles.link} onClick={handleClick}>
      <>{props.children}</>
    </a>
  );
}

export default LinkRenderer;
