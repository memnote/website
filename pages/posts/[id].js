import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import styles from "../../styles/Post.module.css";
import Footer from "../../components/Footer";
import { getNoteMarkdown } from "../../lib/requests";

const thumbnailBaseUrl =
  "https://raw.githubusercontent.com/ErikSzabo/bprof-notes-data/master/assets/thumbnails/";

const Post = ({ markdown }) => {
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // setMeta(matter(content).data);
    if (!id) return;
    getNoteMarkdown(id).then((res) => {
      setContent(res);
      setMeta(matter(res).data);
    });
  }, [id]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Jegyzet - ${id && id.slice(11)}`}</title>
      </Head>

      <div className={styles.mdContainer}>
        <div className={styles.metaContainer}>
          <img
            className={styles.smallPostThumbnail}
            src={meta.thumbnail && `${thumbnailBaseUrl}${meta.thumbnail}`}
          />
          <div className={styles.meta}>
            <h1 className="title">{meta.title}</h1>
            <h3>{meta.description}</h3>
            <h6>{meta.date && meta.date.toLocaleDateString()}</h6>
          </div>
        </div>

        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <Footer />
    </div>
  );
};

// export const getStaticPaths = async () => {
//   const blogs = await getAllNotesMetadata();
//   const mdFileNames = blogs.map((blog) => blog.fileName);
//   const paths = mdFileNames.map((fileName) => ({ params: { fileName } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async ({ params: { fileName } }) => {
//   const markdown = await getNoteMarkdown(fileName);
//   return {
//     props: {
//       markdown,
//     },
//   };
// };

export default Post;
