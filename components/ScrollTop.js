import React, { useState, useEffect, useCallback } from "react";
import { faCaretSquareUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ScrollTop() {
  const [visible, setVisible] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleVisibility = useCallback(() => {
    setVisible(window.pageYOffset > 100);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", toggleVisibility);
    return () => document.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <div
        style={{
          opacity: visible ? "1" : "0",
          position: "fixed",
          bottom: "30px",
          right: "30px",
          cursor: visible ? "pointer" : "auto",
          transition: "all 0.3s",
          userSelect: "none",
        }}
        onClick={scrollTop}
      >
        <FontAwesomeIcon
          style={{ width: "50px", height: "50px", userSelect: "none" }}
          icon={faCaretSquareUp}
        />
      </div>
    </>
  );
}

export default ScrollTop;
