import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { thumbnailUrl } from "../lib/baseURLs";

function NoteCard({ title, description, fileName, date, subject, refChange }) {
  return (
    <Link href={`/posts/${fileName}`}>
      <div ref={refChange} className={styles.card}>
        <img
          className={styles.smallCardImg}
          src={`${thumbnailUrl}/${subject}.svg`}
        />

        <h3>{title} &rarr;</h3>
        <p className={styles.smallDate}>{date}</p>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default NoteCard;
