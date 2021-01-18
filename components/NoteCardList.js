import React from "react";
import styles from "../styles/Home.module.css";
import NoteCard from "./NoteCard";

function NoteCardList({ metaDatas = [] }) {
  return (
    <div className={styles.grid}>
      {metaDatas.map((d, i) => (
        <NoteCard
          key={i}
          title={d.title}
          description={d.description}
          thumbnail={d.thumbnail}
          fileName={d.fileName}
          date={d.date}
        />
      ))}
    </div>
  );
}

export default NoteCardList;
