import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import Meta from "../components/Meta";
import { getSubjects } from "../lib/requests";
import { getMetaData } from "./api/meta";
import NoteCard from "../components/NoteCard";
import Contribute from "../components/Contribute";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import { normalizeQuery } from "../lib/utils";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home({ metaData, subjects, hasMorePage }) {
  const [metaDatas, setMetaDatas] = useState(metaData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(hasMorePage);
  const [ssr, setSsr] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const lastNoteRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const {
    query: { search = "", subject = "" },
  } = useRouter();

  useEffect(() => {
    if (ssr) return;
    setLoading(true);
    setMetaDatas([]);
  }, [subject]);

  useEffect(() => {
    if (ssr) return;
    let cancel;
    axios
      .get(`/api/meta`, {
        params: normalizeQuery({ search, subject, page: 1 }),
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then(({ data: { data: metaDatas, pageCount } }) => {
        setHasMore(pageCount > page);
        setMetaDatas(metaDatas);
        setPage(1);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (axios.isCancel(err)) return;
      });

    return () => {
      cancel();
    };
  }, [search, subject]);

  useEffect(() => {
    if (!hasMore || ssr) return;
    setLoading(true);
    axios
      .get(`/api/meta`, {
        params: normalizeQuery({ search, subject, page }),
        validateStatus: (status) => status < 400,
      })
      .then(({ data: { data: metaDatas, pageCount } }) => {
        setHasMore(pageCount > page);
        setMetaDatas((old) => [...old, ...metaDatas]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    setSsr(false);
  }, []);

  const tailwindCompile = () => (
    <div className="bg-yellow-400 bg-yellow-500 bg-purple-400 bg-red-500 bg-purple-500 bg-yellow-600 bg-blue-400 bg-red-600 bg-purple-600 bg-blue-500 bg-green-500"></div>
  );

  return (
    <>
      <Meta />
      <div className="mx-auto c-container flex">
        <Sidebar subjects={subjects} />

        <div className="border-gray-200 md:border-l md:border-r px-3 md:px-6 xl:w-8/12 mb-14 md:w-4/5">
          <Header subjects={subjects} />

          {metaDatas.map((m, i) => {
            return (
              <NoteCard
                note={m}
                key={i}
                subjects={subjects}
                lastRef={i === metaDatas.length - 1 ? lastNoteRef : null}
              />
            );
          })}

          {metaDatas.length === 0 && !loading && (
            <h1 className="text-lg font-bold p-5">Nincs ilyen jegyzet 😥</h1>
          )}

          {loading && <LoadingSpinner />}
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
