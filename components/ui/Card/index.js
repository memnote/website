import React from "react";
import styles from "./Card.module.css";

const Banner = ({ src, height }) => {
  return (
    <div className={styles.banner}>
      <img src={src} style={{ height }} />
    </div>
  );
};

const TopText = ({ children }) => {
  return <p className={styles.top}>{children}</p>;
};

const BottomText = ({ children }) => {
  return <p className={styles.bottom}>{children}</p>;
};

const Title = ({ text, iconSrc }) => {
  return (
    <div className={styles.title}>
      <img src={iconSrc} alt="ikon" className={styles.icon} />
      <h2>{text}</h2>
    </div>
  );
};

const Description = ({ children }) => {
  return <p className={styles.description}>{children}</p>;
};

const Content = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

const Card = ({ children, reference }) => {
  return (
    <div ref={reference} className={styles.card}>
      {children}
    </div>
  );
};

Card.Banner = Banner;
Card.Content = Content;
Card.TopText = TopText;
Card.Title = Title;
Card.Description = Description;
Card.BottomText = BottomText;

export default Card;
