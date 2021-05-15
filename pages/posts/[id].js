import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import htmlParser from "react-markdown/plugins/html-parser";
import FourOhFour from "../404";
import CodeBlock from "../../components/md-renderers/CodeBlock";
import Table from "../../components/md-renderers/Table";
import LinkRenderer from "../../components/md-renderers/LinkRenderer";
import Meta from "../../components/Meta";
import { getNoteMarkdown, getSubjects } from "../../lib/requests";
import { getMetaData } from "../api/meta";
import Paragraph from "../../components/md-renderers/Paragraph";
import Headings from "../../components/md-renderers/Headings";
import Lists from "../../components/md-renderers/Lists";
import { getSubjectcolor } from "../../lib/utils";
import Link from "next/link";

const parseHtml = htmlParser({
  isValidNode: (node) =>
    node.type === "tag" &&
    (node.name === "u" || node.name === "sub" || node.name === "sup"),
});

const Post = ({
  markdown: content,
  metaData: meta,
  subject,
  subjectKey,
  found,
}) => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const listener = () =>
      setProgress(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  if (router.isFallback) {
    // TODO: Loading
    return <div />;
  }

  if (!found) {
    return <FourOhFour text="Nem találtunk ilyen jegyzetet :(" />;
  }

  return (
    <>
      <div className="fixed w-full h-1 bg-transparent">
        <div
          className={`h-full ${getSubjectcolor(subjectKey)}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto py-10 px-5">
        <Meta
          title={`Memnote - ${meta.title}`}
          description={`Üzemmérnök-informatikus jegyzet - ${meta.description}`}
        >
          <meta name="revised" content={`Memnote, ${meta.date}`} />
        </Meta>

        <Link href="/">
          <div className="text-md bg-gray-100 py-2 px-4 mb-5 rounded-xl inline-block cursor-pointer hover:bg-gray-300">
            Vissza a főoldalra
          </div>
        </Link>
        <h1 className="font-bold text-5xl">{meta.title}</h1>

        <div className="flex gap-2 mt-5 flex-wrap">
          <p
            className={`text-white font-bold text-xs py-1 px-2 rounded-2xl ${getSubjectcolor(
              subjectKey
            )}`}
          >
            {subject}
          </p>
          <p className="bg-gray-200 text-xs py-1 px-2 rounded-2xl">
            {new Date(meta.date).toLocaleDateString()}
          </p>
        </div>

        <hr className="mt-4" />
        <ReactMarkdown
          astPlugins={[parseHtml]}
          allowDangerousHtml
          plugins={[gfm]}
          renderers={{
            code: CodeBlock,
            table: Table,
            link: LinkRenderer,
            paragraph: Paragraph,
            heading: Headings,
            list: Lists,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
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
        subjectKey: metaData.subject,
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
