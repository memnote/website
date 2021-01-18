import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import NoteCardList from "../components/NoteCardList";
import styles from "../styles/Home.module.css";
import { getAllNotesMetadata } from "../lib/requests";
import SearchFilter from "../components/SearchFilter";

export default function Home({ metaData }) {
  const [metaDatas, setMetaDatas] = useState(metaData);
  const [filteredMetaDatas, setFilteredMetaDatas] = useState(metaData);

  return (
    <div className={styles.container}>
      <Head>
        <title>Memnote</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Memnote</h1>

        <p className={styles.description}>
          Hasznos jegyzetek és segédletek{" "}
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

export async function getServerSideProps(context) {
  const metaData = await getAllNotesMetadata();

  return {
    props: {
      metaData,
    },
  };
}
