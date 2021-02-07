import React from "react";
import styles from "./IconButton.module.css";

function IconButton({ src, style, onClick, size }) {
  const click = (e) => {
    if (onClick) onClick(e);
  };

  const applyStyles = style
    ? { ...style, width: size + 10, height: size + 10 }
    : { width: size + 10, height: size + 10 };

  return (
    <div style={applyStyles} onClick={click} className={styles.button}>
      <img
        className={styles.icon}
        style={{ width: size, height: size }}
        src={src}
      />
    </div>
  );
}

export default IconButton;
