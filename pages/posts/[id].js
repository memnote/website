import Head from "next/head";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import styles from "../../styles/Post.module.css";
import Footer from "../../components/Footer";
import { getNoteMarkdown } from "../../lib/requests";

const thumbnailBaseUrl =
  "https://raw.githubusercontent.com/ErikSzabo/bprof-notes-data/master/assets/thumbnails/";

const Post = ({ markdown, metaData }) => {
  const [content, setContent] = useState(markdown);
  const [meta, setMeta] = useState(JSON.parse(metaData));

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Jegyzet - ${meta.title}`}</title>
      </Head>

      <div
        style={{
          backgroundImage: `url(${thumbnailBaseUrl}${meta.subject}.jpg)`,
        }}
        className={styles.metaContainer}
      >
        <div className={styles.metaOverlay}>
          <div className={styles.metaText}>
            <p>{meta.title}</p>
            <p>{new Date(meta.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className={styles.mdContainer}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.id;
  const markdown = await getNoteMarkdown(id);
  const metaData = JSON.stringify(matter(markdown).data);

  return {
    props: {
      markdown,
      metaData,
    },
  };
}

export default Post;
