import Link from "next/link";
import styles from "../styles/404.module.css";
import Meta from "../components/Meta";

export default function FourOhFour({ text = "Az oldal nem található" }) {
  return (
    <div className={styles.container}>
      <Meta
        title="Memnote - Az oldal nem található"
        description="A keresett oldal nem található."
      />

      <h1>Memnote</h1>
      <h2>404 - {text}</h2>
      <Link href="/">Vissza a főoldalra</Link>
    </div>
  );
}
