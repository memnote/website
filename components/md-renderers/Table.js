import React from "react";

function Table(props) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="min-w-full">{props.children}</table>
    </div>
  );
}

export default Table;
