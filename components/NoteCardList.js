import React, { useContext } from "react";
import { ApplicationContext } from "../pages";
import styles from "../styles/Note.module.css";
import NoteCard from "./NoteCard";

function NoteCardList({ refChange }) {
  const { metaDatas, subjects } = useContext(ApplicationContext);

  return (
    <div className={styles.grid}>
      {metaDatas.map((d, i) => {
        return (
          <NoteCard
            key={i}
            title={d.title}
            description={d.description}
            fileName={d.fileName}
            date={d.date}
            subject={d.subject}
            longSubject={subjects[d.subject]}
            refChange={metaDatas.length - 1 === i ? refChange : null}
          />
        );
      })}
    </div>
  );
}

export default NoteCardList;
