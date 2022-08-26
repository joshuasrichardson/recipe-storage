import React, { ReactElement, useContext } from "react";
import Storage from "./storage/Storage";
import { Link } from "react-router-dom";
import { User } from "../types";

export type IntroProps = {
  user?: User;
};

const Intro: React.FC<IntroProps> = ({ user }: IntroProps): ReactElement => {
  if (user == null) {
    return (
      <div className="page">
        <div className="main-container">
          <h1>Storage Recipe</h1>
          <h4>The recipe for better storage management</h4>
          <p className="call-to-action">
            Get started by viewing recipes, logging in, or creating your own
            account.
          </p>
          <div className="selections-container">
            <Link to="/recipes" className="button-link">
              <button className="obvious">See Recipes</button>
            </Link>
            <Link to="/login" className="button-link">
              <button className="obvious">Login</button>
            </Link>
            <Link to="/register" className="button-link">
              <button className="obvious">Create Account</button>
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
