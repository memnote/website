import React from "react";
import Link from "next/link";
import Meta from "../components/Meta";
import { getSubjects } from "../lib/requests";
import { getMetaData } from "./api/meta";
import NoteCard from "../components/NoteCard";
import Contribute from "../components/Contribute";

const menuIcon = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="hashtag"
    className="svg-inline--fa fa-hashtag fa-w-14 w-5 h-5"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"
    ></path>
  </svg>
);

const searchIcon = (
  <svg
    className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  </svg>
);

export default function Home({ metaData, subjects, hasMorePage }) {
  return (
    <>
      <Meta />

      <div className="mx-auto c-container flex">
        <aside
          className="hidden md:flex flex-col sticky h-screen top-0 pt-10 overflow-y-auto pr-10"
          style={{ maxWidth: "20rem" }}
        >
          <div className="py-3 px-2 flex gap-2 items-center text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
            {menuIcon}
            <Link href="/">Összes</Link>
          </div>
          {Object.keys(subjects).map((s, i) => {
            return (
              <div
                key={i}
                className="py-3 px-2 flex gap-2 items-center text-gray-700 hover:bg-gray-100 rounded-lg text-sm"
              >
                {menuIcon}
                <Link href={`/?subject=${s}`}>{subjects[s]}</Link>
              </div>
            );
          })}
        </aside>

        <div className="border-gray-200 md:border-l md:border-r px-3 md:px-6 xl:w-8/12">
          <div className="pt-10 pb-3 bg-white px-5">
            <h1 className="text-4xl font-bold">Memnote</h1>
            <p>Hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak.</p>
            <div className="relative w-full mt-4">
              <input
                placeholder="Keresés a jegyzetek között"
                type="text"
                className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              {searchIcon}
            </div>
          </div>

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
