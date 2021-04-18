import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import htmlParser from "react-markdown/plugins/html-parser";
import FourOhFour from "../404";
import CodeBlock from "../../components/md-renderers/CodeBlock";
import Table from "../../components/md-renderers/Table";
import LinkRenderer from "../../components/md-renderers/LinkRenderer";
import Meta from "../../components/Meta";
import styles from "../../styles/Post.module.css";
import { getNoteMarkdown, getSubjects } from "../../lib/requests";
import { getMetaData } from "../api/meta";

const parseHtml = htmlParser({
  isValidNode: (node) =>
    node.type === "tag" &&
    (node.name === "u" || node.name === "sub" || node.name === "sup"),
});

const Post = ({ markdown: content, metaData: meta, subject, found }) => {
  const router = useRouter();

  if (router.isFallback) {
    // TODO: Loading
    return <div />;
  }

  if (!found) {
    return <FourOhFour text="Nem találtunk ilyen jegyzetet :(" />;
  }

  return (
    <div className={styles.container}>
      <Meta
        title={`Memnote - ${meta.title}`}
        description={`Üzemmérnök-informatikus jegyzet - ${meta.description}`}
      >
        <meta name="revised" content={`Memnote, ${meta.date}`} />
      </Meta>

      <div className={styles.metaContainer}>
        <div className={styles.metaCenter}>
          <div className={styles.metaText}>
            <p>{meta.title}</p>
            <button>Vissza</button>
          </div>
        </div>
      </div>

      <div className={styles.mdContainer}>
        <div className={styles.backMeta}>
          <div>
            <p>{subject}</p>
            <p>{new Date(meta.date).toLocaleDateString()}</p>
          </div>
        </div>
        <ReactMarkdown
          astPlugins={[parseHtml]}
          allowDangerousHtml
          plugins={[gfm]}
          renderers={{ code: CodeBlock, table: Table, link: LinkRenderer }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const id = params.id;
  try {
    const { markdown, metaData } = await getNoteMarkdown(id);
    const subjects = await getSubjects();
    const subject = subjects[metaData.subject];

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
  const paths = metaData.data.map((meta) => ({
    params: { id: meta.fileName },
  }));

  return { paths, fallback: true };
}

export default Post;
