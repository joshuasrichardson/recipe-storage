import React, { useState, useContext } from "react";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";

const Login = ({ hasAccount }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState("");
  const { setUser } = useContext(Context);
  const navigate = useNavigate();

  const onLoggedIn = (user) => {
    setUser(user);
    navigate("/storage", { replace: true });
  };

  const login = async (e) => {
    e.preventDefault();
    ServerFacade.login(username, password, onLoggedIn, setErr);
  };

  const register = async (e) => {
    e.preventDefault();
    ServerFacade.register(
      username,
      password,
      password2,
      firstName,
      lastName,
      onLoggedIn,
      setErr
    );
  };

  return (
    <div className="main-container">
      <h1>Recipe Storage</h1>
      <form
        className="user-input"
        onSubmit={(e) => (hasAccount ? login(e) : register(e))}
      >
        {!hasAccount && (
          <div>
            <label className="item" htmlFor="first-name">
              First Name:
            </label>
            <input
              type="text"
              name="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label className="item" htmlFor="last-name">
              Last Name:
            </label>
            <input
              type="text"
              name="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
        )}
        <label className="item" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label className="item" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {!hasAccount && (
          <div>
            <label className="item" htmlFor="password">
              Confirm Password:
            </label>
            <input
              type="password"
              name="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            ></input>
          </div>
        )}
        <p>{err}</p>
        <div className="login-container">
          <button className="obvious" type="submit">
            {hasAccount && "Login"}
            {!hasAccount && "Create"}
          </button>
          <a
            className="link"
            onClick={() => navigate(hasAccount ? "/register" : "/login")}
          >
            {hasAccount && "Don't have an account? Click here to create one."}
            {!hasAccount && "Have an account? Click here to login."}
          </a>
        </div>
      </form>
      <div className="extra-space"></div>
    </div>
  );
};

export default Login;
