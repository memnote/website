import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import htmlParser from "react-markdown/plugins/html-parser";
import matter from "gray-matter";
import styles from "../../styles/Post.module.css";
import Footer from "../../components/Footer";
import FourOhFour from "../404";
import CodeBlock from "../../components/CodeBlock";
import { faCaretSquareLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getNoteMarkdown, getSubjects } from "../../lib/requests";
import { backgroundUrl } from "../../lib/baseURLs";
import Table from "../../components/Table";
import { getMetaData } from "../api/meta";
import Loading from "../../components/Loading";

const parseHtml = htmlParser({
  isValidNode: (node) =>
    node.type === "tag" &&
    (node.name === "u" || node.name === "sub" || node.name === "sup"),
});

const Post = ({ markdown: content, metaData: meta, subject, found }) => {
  // const [content, setContent] = useState(markdown);
  // const [meta, setMeta] = useState(metaData);

  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if (!found) {
    return <FourOhFour text="Nem találtunk ilyen jegyzetet :(" />;
  }

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
        <meta name="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="/og-image.png" />
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
              <div className={styles.backMeta}>
                <Link className={styles.link} href="/">
                  <FontAwesomeIcon
                    className={styles.backIcon}
                    size="3x"
                    icon={faCaretSquareLeft}
                  />
                </Link>
                <div>
                  <p>{subject}</p>
                  <p>{new Date(meta.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mdContainer}>
        <ReactMarkdown
          astPlugins={[parseHtml]}
          allowDangerousHtml
          plugins={[gfm]}
          renderers={{ code: CodeBlock, table: Table }}
        >
          {content}
        </ReactMarkdown>
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticProps({ params }) {
  const id = params.id;
  let markdown, metaData, subjects, subject;
  try {
    markdown = await getNoteMarkdown(id);
    subjects = await getSubjects();
    const meta = matter(markdown).data;
    metaData = { ...meta, date: meta.date.toISOString() };
    subject = subjects[metaData.subject];

    return {
      props: {
        markdown,
        metaData,
        subject,
        found: true,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (err) {
    return {
      props: {
        found: false,
      },
      revalidate: 60 * 30,
    };
  }
}

export async function getStaticPaths() {
  const metaData = await getMetaData();
  const paths = metaData.data.splice(0, 2).map((meta) => ({
    params: { id: meta.fileName },
  }));

  return { paths, fallback: true };
}

export default Post;
