import React, { ReactElement } from "react";
import "../App.css";
import { Link } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../api/ServerFacade.ts";
import { User } from "../types";

export type NavParams = {
  user: User;
  setUser: (user: User) => void;
};

const Nav: React.FC<NavParams> = ({
  user,
  setUser,
}: NavParams): ReactElement => {
  const logout = async (): Promise<void> => {
    if (user) {
      await ServerFacade.logout();
      setUser(null);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid nav-links">
          <Link to="/" className="navbar-brand logo">
            Storage Recipe
          </Link>
          <Link to="/" className="navbar-brand logo">
            {user !== null ? user.username : ""}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {user && (
                <li>
                  <Link to="/storage" className="nav-link">
                    Storage
                  </Link>
                </li>
              )}
              {user && (
                <li>
                  <Link to="/storage/history" className="nav-link">
                    History
                  </Link>
                </li>
              )}
              <li>
                <Link to="/recipes" className="nav-link">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-link" onClick={logout}>
                  {user ? "Logout" : "Login"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
