import React from "react";
import Link from "next/link";

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

const NoteCard = ({ note: n, subjects }) => {
  return (
    <Link href={`/posts/${n.fileName}`}>
      <div className="my-10 cursor-pointer hover:bg-gray-100 p-5 rounded-xl">
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
