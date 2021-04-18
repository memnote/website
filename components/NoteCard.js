import React from "react";
import Link from "next/link";
import { getSubjectcolor } from "../lib/utils";

const NoteCard = ({ note: n, subjects, lastRef }) => {
  return (
    <Link href={`/posts/${n.fileName}`}>
      <div
        className="my-10 cursor-pointer bg-gray-100 p-5 rounded-xl shadow-md"
        ref={lastRef}
      >
        <h2 className="font-bold mb-2 text-2xl">{n.title}</h2>
        <p className="text-gray-600 mb-2 text-lg max-w-prose">
          {n.description}
        </p>
        <div className="flex gap-2">
          <p
            className={`text-white font-bold text-xs py-1 px-2 rounded-2xl ${getSubjectcolor(
              n.subject
            )}`}
          >
            {subjects[n.subject]}
          </p>
          <p className="bg-gray-200 text-xs py-1 px-2 rounded-2xl">
            {new Date(n.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
