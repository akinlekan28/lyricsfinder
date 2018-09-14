import React from "react";
import book from "./book.svg";

export default () => {
  return (
    <div>
      <img
        src={book}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="loading"
      />
    </div>
  );
};
