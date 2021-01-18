import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const thumbnailBaseUrl =
  "https://raw.githubusercontent.com/ErikSzabo/bprof-notes-data/master/assets/thumbnails/";

function NoteCard({ title, description, thumbnail, fileName, date }) {
  return (
    <Link href={`/posts/${fileName}`}>
      <div className={styles.card}>
        <img
          className={styles.smallCardImg}
          src={`${thumbnailBaseUrl}${thumbnail}`}
        />
        <h3>{title} &rarr;</h3>
        <p className={styles.smallDate}>{date}</p>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default NoteCard;
