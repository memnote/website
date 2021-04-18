import React, { useRef, useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const CodeBlock = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(ref.current);
  }, [ref]);

  return (
    <pre>
      <code ref={ref} className={`language-${props.language}`}>
        {props.value}
      </code>
    </pre>
  );
};

export default CodeBlock;
