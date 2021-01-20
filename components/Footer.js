import React from "react";
import styles from "../styles/Home.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        Szeretnél jegyzetet feltölteni? Esetleg hibát találtál?{" "}
        <a target="blank" href="https://github.com/memnote/notes">
          Irány a data repo
        </a>
      </div>
    </footer>
  );
};

export default Footer;
