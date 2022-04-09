import React, { useState, useContext } from "react";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [hasAccount, setHasAccount] = useState(props.hasAccount);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    let response = null;
    try {
      if (hasAccount) {
        response = await axios.post("/api/users/login", {
          username: username,
          password: password,
        });
      } else {
        response = await register();
      }
      setUser(response.data.user);
      navigate("/add-item", { replace: true });
    } catch (error) {
      setErr(error.response.data.message);
      setUser(null);
    }
  };

  const register = async () => {
    if (!firstName || !lastName) return;
    return await axios.post("/api/users", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    });
  };

  const checkPasswords = (password2) => {
    // TODO
  };

  return (
    <div className="main-container">
      <h1>Recipe Storage</h1>
      <form className="user-input" onSubmit={login}>
        {!hasAccount && (
          <div>
            <label className="item" htmlFor="first-name">
              First Name:
            </label>
            <input
              type="text"
              name="first-name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label className="item" htmlFor="last-name">
              Last Name:
            </label>
            <input
              type="text"
              name="last-name"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
        )}
        <label className="item" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label className="item" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          name="password"
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
              onChange={(e) => checkPasswords(e.target.value)}
            ></input>
          </div>
        )}
        <p>{err}</p>
        <div className="login-container">
          <button type="submit">
            {hasAccount && "Login"}
            {!hasAccount && "Create"}
          </button>
          <a className="link" onClick={() => setHasAccount(!hasAccount)}>
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
