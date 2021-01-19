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
          fileName={d.fileName}
          date={d.date}
          subject={d.subject}
        />
      ))}
    </div>
  );
}

export default NoteCardList;
