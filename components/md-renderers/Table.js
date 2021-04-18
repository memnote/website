import React from "react";
import styles from "../../styles/Post.module.css";

function Table(props) {
  return (
    <div className={styles.tableContainer}>
      <table>{props.children}</table>
    </div>
  );
}

export default Table;
