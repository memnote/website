import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import htmlParser from "react-markdown/plugins/html-parser";
import Footer from "../../components/Footer";
import FourOhFour from "../404";
import CodeBlock from "../../components/CodeBlock";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import LinkRenderer from "../../components/LinkRenderer";
import Meta from "../../components/Meta";
import styles from "../../styles/Post.module.css";
import { getNoteMarkdown, getSubjects } from "../../lib/requests";
import { getMetaData } from "../api/meta";
import Button from "../../components/ui/Button";
import useHistoryContext from "../../hooks/useHistoryContext";
import { actions } from "../../lib/state/history/actions";

const parseHtml = htmlParser({
  isValidNode: (node) =>
    node.type === "tag" &&
    (node.name === "u" || node.name === "sub" || node.name === "sup"),
});

const Post = ({ markdown: content, metaData: meta, subject, found }) => {
  const router = useRouter();
  const { dispatch } = useHistoryContext();

  if (router.isFallback) {
    return <Loading />;
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
            <Button
              background="white"
              color="black"
              style={{
                fontWeight: "bold",
                boxShadow: "0px 0px 8px black !important",
                height: 40,
              }}
              onClick={() => dispatch({ type: actions.GO_BACK })}
            >
              <img src="/arrowleft.svg" /> <p>Vissza</p>
            </Button>
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

      <Footer
        text="Hibát találtál? Esetleg szeretnéd kiegészíteni a jegyzetet?"
        linkText="Szerkesztés Githubon"
        link={`https://github.com/memnote/notes/edit/master/posts/${router.query.id}.md`}
      />
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
