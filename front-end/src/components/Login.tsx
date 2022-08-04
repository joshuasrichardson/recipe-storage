import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../api/ServerFacade.ts";
import { User } from "../types";

export type LoginProps = {
  hasAccount?: boolean;
  setUser: (user: User) => void;
};

const Login: React.FC<LoginProps> = ({
  hasAccount,
  setUser,
}: LoginProps): ReactElement => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const navigate = useNavigate();

  const onLoggedIn = (user: User): void => {
    setUser(user);
    navigate("/storage", { replace: true });
  };

  const login = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    ServerFacade.login(username, password, onLoggedIn, setErr);
  };

  const register = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
