import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";

const Login = ({ hasAccount, setUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onLoggedIn = (user) => {
    setUser(user);
    navigate("/storage", { replace: true });
  };

  const onFailure = (err) => {
    setErr(err.response?.data?.message || "Unknown error occurred");
    if (!err.response) console.log(err);
  };

  const login = async (e) => {
    e.preventDefault();
    ServerFacade.login(username, password, onLoggedIn, onFailure);
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
      onFailure
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
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label className="item" htmlFor="last-name">
              Last Name:
            </label>
            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
        )}
        <label className="item" htmlFor="username">
          Username:
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label className="item" htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {!hasAccount && (
          <div>
            <label className="item" htmlFor="password2">
              Confirm Password:
            </label>
            <input
              id="password2"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            ></input>
          </div>
        )}
        <p>{err}</p>
        <div className="login-container">
          <button data-testid="login-button" className="obvious" type="submit">
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
