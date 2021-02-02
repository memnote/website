import React from "react";
import "react-awesome-slider/dist/styles.css";
import styles from "../styles/Hero.module.css";
import SearchFilter from "./SearchFilter";

function Hero() {
  return (
    <div className={styles.container}>
      <div style={{ flex: 3 }}>
        <img src="/static/hero.svg" alt="" />
      </div>
      <div style={{ flex: 4, padding: 20 }}>
        <div className={styles.right}>
          <div className={styles.rightChild}>
            <h1>Memnote Jegyzetek</h1>
            <p>Hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak.</p>
          </div>
          <div className={styles.rightChild}>
            <SearchFilter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
