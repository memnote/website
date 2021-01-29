import React from "react";
import styles from "../styles/Home.module.css";

const Footer = ({ children }) => {
  return <footer className={styles.footer}>{children}</footer>;
};

export default Footer;
