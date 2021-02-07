import React from "react";
import styles from "./IconButton.module.css";

function IconButton({ src, alt }) {
  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  );
}

export default IconButton;
