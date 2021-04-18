import React from "react";
import Link from "next/link";
import Meta from "../components/Meta";
import { getSubjects } from "../lib/requests";
import { getMetaData } from "./api/meta";
import NoteCard from "../components/NoteCard";
import Contribute from "../components/Contribute";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Home({ metaData, subjects, hasMorePage }) {
  return (
    <>
      <Meta />

      <div className="mx-auto c-container flex">
        <Sidebar subjects={subjects} />

        <div className="border-gray-200 md:border-l md:border-r px-3 md:px-6 xl:w-8/12">
          <Header />

          {metaData.map((m, i) => {
            return <NoteCard note={m} key={i} subjects={subjects} />;
          })}
        </div>

        <Contribute />
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const search = query.search;
  const subject = query.subject;

  const rawMetaData = await getMetaData({ page: 1, search, subject });
  const subjects = await getSubjects();
  const metaData = rawMetaData.data;
  const hasMorePage = rawMetaData.pageCount > 1;

  return {
    props: {
      metaData: metaData ? metaData : [],
      subjects,
      hasMorePage,
    },
  };
}
