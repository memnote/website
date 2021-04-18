import React from "react";
import Link from "next/link";
import Meta from "../components/Meta";
import { getSubjects } from "../lib/requests";
import { getMetaData } from "./api/meta";

const githubIcon = (
  <svg
    width="1024"
    height="1024"
    viewBox="0 0 1024 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
      transform="scale(64)"
      fill="#1B1F23"
    />
  </svg>
);

const subjectColorMap = {
  progalap: "bg-blue-500",
  algraf: "bg-green-500",
  hwa: "bg-purple-600",
  opre: "bg-red-600",
  hau: "bg-blue-400",
  oop: "bg-yellow-600",
  adatkezeles: "bg-purple-500",
  ami: "bg-red-500",
  kodit: "bg-purple-400",
  szoftech: "bg-yellow-500",
  evip: "bg-yellow-400",
  egyeb: "bg-gray-500",
};

function getSubjectcolor(key) {
  return subjectColorMap[key] ? subjectColorMap[key] : subjectColorMap.egyeb;
}

export default function Home({ metaData, subjects, hasMorePage }) {
  console.log(metaData);
  return (
    <>
      <Meta />

      <div className="mx-auto c-container">
        <div className="flex">
          <aside
            className="hidden md:flex flex-col sticky h-screen top-0 pt-10 overflow-y-auto pr-20"
            style={{ maxWidth: "20rem" }}
          >
            {Object.values(subjects).map((s) => {
              return (
                <div className="my-3">
                  <Link href="#">{s}</Link>
                </div>
              );
            })}
          </aside>

          <div className="border-gray-500 md:border-l md:border-r px-3 md:px-10">
            <div className="pt-10 pb-3 bg-white">
              <h1 className="text-4xl font-bold">Memnote</h1>
              <p>
                Hasznos jegyzetek és segédletek üzemmérnök-informatikusoknak.
              </p>
              <div className="relative w-full mt-4">
                <input
                  placeholder="Keresés a jegyzetek között"
                  type="text"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <svg
                  className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>

            {metaData.map((m) => {
              return (
                <div className="my-10">
                  <h2 className="font-bold mb-2 text-2xl">{m.title}</h2>
                  <p className="text-gray-600 mb-2 text-lg max-w-prose">
                    {m.description}
                  </p>
                  <div className="flex gap-2">
                    <p
                      className={`text-white font-bold text-xs py-1 px-2 rounded-2xl ${getSubjectcolor(
                        m.subject
                      )}`}
                    >
                      {subjects[m.subject]}
                    </p>
                    <p className="bg-gray-200 text-xs py-1 px-2 rounded-2xl">
                      {new Date(m.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sticky h-screen top-0 pt-10 hidden xl:block ml-10">
            <div className="bg-gray-100 rounded-xl">
              <h3 className="px-5 pt-5 font-bold text-lg">Hozzájárulás</h3>
              <div className="p-5">
                <div className="flex gap-2 mb-2 items-center">
                  {githubIcon}
                  <a href="https://github.com/memnote/website" target="_blank">
                    Weboldal
                  </a>
                </div>
                <div className="flex gap-2 items-center">
                  {githubIcon}
                  <a href="https://github.com/memnote/notes" target="_blank">
                    Jegyzet készítés
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {metaData.length <= 0 && !loading && (
          <div>
            <h2>Nem található a keresésnek megfelelő jegyzet!</h2>
          </div>
        )}

        {false && <img src="./loading.gif" />}
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
