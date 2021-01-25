import React from "react";
import Link from "next/link";
import styles from "../styles/Note.module.css";
import { backgroundUrl } from "../lib/baseURLs";

function NoteCard({
  title,
  description,
  fileName,
  date,
  subject,
  refChange,
  longSubject,
}) {
  return (
    <Link href={`/posts/${fileName}`}>
      <div ref={refChange} className={styles.card}>
        <div>
          <img
            className={styles.smallCardImg}
            src={`${backgroundUrl}/${subject}.svg`}
          />
          <div className={styles.headerTextContainer}>
            <h3>{title} &rarr;</h3>
            <p>{longSubject}</p>
            <p className={styles.smallDate}>{date}</p>
          </div>
        </div>

        <div className={styles.cardTextContainer}>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
