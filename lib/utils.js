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

export function getSubjectcolor(key) {
  return subjectColorMap[key] ? subjectColorMap[key] : subjectColorMap.egyeb;
}

export function normalizeQuery(query) {
  for (let key in query) {
    if (!query[key]) delete query[key];
  }
  return query;
}
