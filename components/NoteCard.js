import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const thumbnailBaseUrl =
  "https://raw.githubusercontent.com/memnote/notes/master/assets/thumbnails/";

function NoteCard({ title, description, fileName, date, subject }) {
  return (
    <Link href={`/posts/${fileName}`}>
      <div className={styles.card}>
        <img
          className={styles.smallCardImg}
          src={`${thumbnailBaseUrl}${subject}.jpg`}
        />

        <h3>{title} &rarr;</h3>
        <p className={styles.smallDate}>{date}</p>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default NoteCard;
