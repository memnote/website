import React from "react";
import styles from "./AppBar.module.css";

function Navigation({ children }) {
  return <div className={styles.navigation}>{children}</div>;
}

function Logo({ children }) {
  return <div className={styles.logo}>{children}</div>;
}

function AppBar({ children, maxWidth = "100%" }) {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer} style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}

AppBar.Logo = Logo;
AppBar.Navigation = Navigation;

export default AppBar;
