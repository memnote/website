import React, { useState, useEffect, useCallback } from "react";

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
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
      />
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
        <img
          style={{ width: "50px", height: "50px", userSelect: "none" }}
          src="/arrow-up.svg"
        />
      </div>
    </>
  );
}

export default ScrollTop;
