import React from "react";
import { useRouter } from "next/router";
import { normalizeQuery } from "../lib/utils";

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

const Sidebar = ({ subjects }) => {
  const router = useRouter();
  const {
    query: { search = "", subject = "" },
  } = router;

  const updateUrl = (search, subject) => {
    router.push(
      { pathname: "/", query: normalizeQuery({ search, subject }) },
      null,
      { shallow: true }
    );
  };

  return (
    <aside
      className="hidden md:flex flex-col sticky h-screen top-0 pt-10 pr-10"
      style={{ maxWidth: "18rem" }}
    >
      <div
        className="bg-gray-100 p-3 rounded-lg shadow-md overflow-y-auto"
        style={{ maxHeight: "90%" }}
      >
        <div
          className={`mb-1 py-3 px-2 flex gap-2 items-center text-gray-700 hover:bg-white rounded-lg text-sm cursor-pointer ${
            !subject && "font-bold bg-white"
          }`}
          onClick={() => updateUrl(search, null)}
        >
          {menuIcon}
          <span className="line-clamp-1 lg:line-clamp-none">Összes</span>
        </div>
        {Object.keys(subjects).map((s, i) => {
          return (
            <div
              key={i}
              className={`my-1 py-3 px-2 flex gap-2 items-center text-gray-700 hover:bg-white rounded-lg text-sm cursor-pointer ${
                s === subject && "font-bold bg-white"
              }`}
              onClick={() => updateUrl(search, s)}
            >
              {menuIcon}
              <span className="line-clamp-1 lg:line-clamp-none">
                {subjects[s]}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
