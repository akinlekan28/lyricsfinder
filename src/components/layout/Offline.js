import React from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Offline = () => {
  return (
    <div>
      <h1 className="col-md-6 mx-auto text-danger text-center">
        Hello, You are currently offline!
      </h1>
      <p className="text-lead text-center">
        Make sure you're connected to the internet
      </p>
      <Spinner />
      <Link to="/" className="btn btn-outline-primary btn-block">
        Home
      </Link>
    </div>
  );
};

export default Offline;
