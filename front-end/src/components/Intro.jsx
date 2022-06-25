import React, { useContext } from "react";
import { Context } from "../App";
import Storage from "./Storage.jsx";
import { Link } from "react-router-dom";

const Intro = () => {
  const { user } = useContext(Context);

  if (user == null) {
    return (
      <div className="page">
        <div className="main-container">
          <h1>Recipe Storage</h1>
          <p className="call-to-action">
            Get started by viewing recipes, logging in, or creating your own
            account.
          </p>
          <div className="selections-container">
            <Link to="/recipes" className="button-link">
              <button>See Recipes</button>
            </Link>
            <Link to="/login" className="button-link">
              <button>Login</button>
            </Link>
            <Link to="/register" className="button-link">
              <button>Create Account</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <Storage />;
  }
};

export default Intro;
