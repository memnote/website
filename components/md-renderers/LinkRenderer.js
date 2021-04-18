import React from "react";
import { useRouter } from "next/router";

function LinkRenderer(props) {
  const router = useRouter();
  const url = props.node.url;
  const path = url.includes("memnote")
    ? url.replace("https://memnote.net/posts", "/posts")
    : url;

  const handleClick = () => {
    if (!url.includes("memnote")) {
      return window.open(path, "blank");
    }
    router.push(path);
  };

  return (
    <a className="cursor-pointer inline text-blue-600" onClick={handleClick}>
      <>{props.children}</>
    </a>
  );
}

export default LinkRenderer;
