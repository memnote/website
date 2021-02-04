import React, { useState, useEffect, useCallback } from "react";
import ArrowUp from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  button: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    transition: "all 0.3s",
    userSelect: "none",
    WebkitTouchCallout: "none",
  },
  arrow: {
    width: "50px",
    height: "50px",
    userSelect: "none",
    color: "black",
    WebkitTouchCallout: "none",
  },
}));

function ScrollTop() {
  const classes = useStyles();
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
        className={classes.button}
        style={{
          opacity: visible ? "1" : "0",
          cursor: visible ? "pointer" : "auto",
        }}
        onClick={scrollTop}
      >
        <ArrowUp className={classes.arrow} />
      </IconButton>
    </>
  );
}

export default ScrollTop;
