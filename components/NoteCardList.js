import React from "react";
import styles from "../styles/Home.module.css";
import NoteCard from "./NoteCard";

function NoteCardList({ refChange, subjects, metaDatas = [] }) {
  return (
    <div className={styles.grid}>
      {metaDatas.map((d, i) => {
        if (metaDatas.length - 1 === i) {
          return (
            <NoteCard
              key={i}
              title={d.title}
              description={d.description}
              fileName={d.fileName}
              date={d.date}
              subject={d.subject}
              longSubject={subjects[d.subject]}
              refChange={refChange}
            />
          );
        }
        return (
          <NoteCard
            key={i}
            title={d.title}
            description={d.description}
            fileName={d.fileName}
            date={d.date}
            subject={d.subject}
            longSubject={subjects[d.subject]}
          />
        );
      })}
    </div>
  );
}

export default NoteCardList;
