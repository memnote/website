import Head from "next/head";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import styles from "../../styles/Post.module.css";
import Footer from "../../components/Footer";
import CodeBlock from "../../components/CodeBlock";
import { getNoteMarkdown, getSubjects } from "../../lib/requests";
import { backgroundUrl } from "../../lib/baseURLs";

const Post = ({ markdown, metaData, subject }) => {
  const [content, setContent] = useState(markdown);
  const [meta, setMeta] = useState(JSON.parse(metaData));

  return (
    <div className={styles.container}>
      <Head>
        <meta httpEquiv="content-language" content="hu" />
        <title>{`Memnote - ${meta.title}`}</title>
        <meta name="title" content={`Memnote - ${meta.title}`} />
        <meta name="og:title" content={`Memnote - ${meta.title}`} />
        <meta name="twitter:title" content={`Memnote - ${meta.title}`} />
        <meta
          name="description"
          content={`Üzemmérnök-informatikus jegyzet - ${meta.description}`}
        />
        <meta
          name="og:description"
          content={`Üzemmérnök-informatikus jegyzet - ${meta.description}`}
        />
        <meta
          name="twitter:description"
          content={`Üzemmérnök-informatikus jegyzet - ${meta.description}`}
        />
        <meta name="revised" content={`Memnote, ${meta.date}`} />
      </Head>

      <div
        style={{
          backgroundImage: `url(${backgroundUrl}/${meta.subject}.svg)`,
        }}
        className={styles.metaContainer}
      >
        <div className={styles.metaOverlay}>
          <div className={styles.metaCenter}>
            <div className={styles.metaText}>
              <p>{meta.title}</p>
              <p>{subject}</p>
              <p>{new Date(meta.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mdContainer}>
        <ReactMarkdown renderers={{ code: CodeBlock }}>{content}</ReactMarkdown>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.id;
  let markdown, metaData, subjects;
  try {
    markdown = await getNoteMarkdown(id);
    subjects = await getSubjects();
    metaData = matter(markdown).data;
  } catch (err) {
    markdown =
      "# Nincs ilyen jegyzet!\n Nem található ilyen jegyzet a data repoban. Valószínűleg hibás a link.";
    metaData = JSON.stringify({
      title: "Nem található",
      description: "A keresett jegyzet nem található",
      date: new Date().toLocaleDateString(),
    });
  }

  return {
    props: {
      markdown,
      metaData: JSON.stringify(metaData),
      subject: subjects[metaData.subject],
    },
  };
}

export default Post;
