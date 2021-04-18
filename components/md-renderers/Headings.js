import React from "react";

const Headings = ({ level, children }) => {
  const createHeading = () => {
    if (level == 1) {
      return <h1 className="font-bold text-3xl my-8">{children}</h1>;
    } else if (level == 2) {
      return <h2 className="font-bold text-2xl my-5">{children}</h2>;
    } else if (level == 3) {
      return <h3 className="font-bold text-xl my-4">{children}</h3>;
    } else if (level == 4) {
      return <h4 className="font-bold text-lg my-4">{children}</h4>;
    } else if (level == 5) {
      return <h5 className="font-bold text-md my-4">{children}</h5>;
    } else {
      return <h6 className="font-bold text-sm my-4">{children}</h6>;
    }
  };
  return <div>{createHeading()}</div>;
};

export default Headings;
