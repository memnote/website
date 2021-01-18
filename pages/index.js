import Head from "next/head";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NoteCardList from "../components/NoteCardList";
import styles from "../styles/Home.module.css";
import { getAllNotesMetadata } from "../lib/requests";
import SearchFilter from "../components/SearchFilter";

export default function Home() {
  const [metaDatas, setMetaDatas] = useState([]);
  const [filteredMetaDatas, setFilteredMetaDatas] = useState([]);

  useEffect(() => {
    getAllNotesMetadata().then((res) => {
      setMetaDatas(res);
      setFilteredMetaDatas(res);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>BME BPROF NOTES</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>BME BPROF</h1>

        <p className={styles.description}>
          Hasznos jegyzetek és segédletek gyűjteménye{" "}
          <code className={styles.code}>Üzemmérnök informatikusoknak</code>
        </p>

        <SearchFilter
          setFilteredMetaDatas={setFilteredMetaDatas}
          metaDatas={metaDatas}
        />

        <NoteCardList metaDatas={filteredMetaDatas} />
      </main>

      <Footer />
    </div>
  );
}
