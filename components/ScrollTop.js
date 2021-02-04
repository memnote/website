import React, { useState, useEffect, useCallback } from "react";
import ArrowUp from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";

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
      <IconButton
        style={{
          opacity: visible ? "1" : "0",
          cursor: visible ? "pointer" : "auto",
          position: "fixed",
          bottom: "30px",
          right: "30px",
          transition: "all 0.3s",
          userSelect: "none",
          WebkitTouchCallout: "none",
        }}
        onClick={scrollTop}
      >
        <ArrowUp
          style={{
            width: "50px",
            height: "50px",
            userSelect: "none",
            color: "black",
            WebkitTouchCallout: "none",
          }}
        />
      </IconButton>
    </>
  );
}

export default ScrollTop;
