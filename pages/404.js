import Link from "next/link";
import Head from "next/head";
import styles from "../styles/404.module.css";

export default function FourOhFour({ text = "Az oldal nem található" }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Memnote - Az oldal nem található</title>
      </Head>

      <h1>Memnote</h1>
      <h2>404 - {text}</h2>
      <Link href="/">Vissza a főoldalra</Link>
    </div>
  );
}
