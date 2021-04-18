import React from "react";

const Lists = ({ ordered, children }) => {
  return ordered ? (
    <ol className="list-decimal list-inside ml-4">{children}</ol>
  ) : (
    <ul className="list-disc list-inside ml-4">{children}</ul>
  );
};

export default Lists;
