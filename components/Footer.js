import React from "react";
import styles from "../styles/Home.module.css";

const Footer = ({ text, linkText, link }) => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>{text}</p>
        <a href={link} target="blank">
          {linkText}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
