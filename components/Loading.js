import React from "react";
import styles from "../styles/404.module.css";
import Meta from "./Meta";

function Loading() {
  return (
    <div className={styles.container}>
      <Meta title="Betöltés..." description="Keresett jegyzet betöltése..." />

      <h1>Memnote</h1>
      <p style={{ margin: "0px", padding: "0px" }}>Betöltés...</p>
      <img
        style={{ width: "50px", height: "50px", marginTop: "25px" }}
        src="/loading.gif"
      />
    </div>
  );
}

export default Loading;