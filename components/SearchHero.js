import React from "react";
import SearchFilter from "./SearchFilter";
import styles from "../styles/Home.module.css";

function Hero() {
  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.heroSlogen}>
        Hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak.
      </h1>
      <SearchFilter />
    </div>
  );
}

export default Hero;
