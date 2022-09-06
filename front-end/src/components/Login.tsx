import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../api/ServerFacade.ts";
// @ts-ignore
import SRButton from "../sr-ui/SRButton.tsx";
import { User } from "../types";
// @ts-ignore
import SRHeader from "../sr-ui/SRHeader.tsx";
// @ts-ignore
import SRContainer from "../sr-ui/SRContainer.tsx";
// @ts-ignore
import SRFlex from "../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRText from "../sr-ui/SRText.tsx";
// @ts-ignore
import SRTextInput from "../sr-ui/SRTextInput.tsx";
// @ts-ignore
import SRForm from "../sr-ui/SRForm.tsx";
// @ts-ignore
import { themeRed } from "../sr-ui/styles.ts";

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

  const login = async (): Promise<void> => {
    ServerFacade.login({
      username,
      password,
      onSuccess: onLoggedIn,
      onFailure: setErr,
    });
  };

  const register = async (): Promise<void> => {
    ServerFacade.register({
      username,
      password,
      password2,
      firstName,
      lastName,
      onSuccess: onLoggedIn,
      onFailure: setErr,
    });
  };

  const useAccount = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    hasAccount ? login() : register();
  };

  return (
    <SRContainer maxWidth="large" margin="xxlarge">
      <SRHeader size="xlarge" padding="xlarge" underlined>
        Storage Recipe
      </SRHeader>
      <SRForm onSubmit={useAccount} padding="large">
        {!hasAccount && (
          <div>
            <SRTextInput
              id="first-name"
              label="First Name:"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></SRTextInput>
            <SRTextInput
              id="last-name"
              label="Last Name:"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></SRTextInput>
          </div>
        )}
        <SRTextInput
          id="username"
          label="Username:"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></SRTextInput>
        <SRTextInput
          id="password"
          label="Password:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></SRTextInput>
        {!hasAccount && (
          <SRTextInput
            id="password2"
            label="Confirm Password:"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></SRTextInput>
        )}
        <SRText style={{ textAlign: "center" }} color={themeRed}>
          {err}
        </SRText>
        <SRFlex direction="column">
          <SRButton dataTestid="login-button" onClick={useAccount}>
            {hasAccount && "Login"}
            {!hasAccount && "Create"}
          </SRButton>
          <a
            href={hasAccount ? "/register" : "/login"}
            style={{ margin: "15px" }}
          >
            {hasAccount && "Don't have an account? Click here to create one."}
            {!hasAccount && "Have an account? Click here to login."}
          </a>
        </SRFlex>
      </SRForm>
    </SRContainer>
  );
};

export default Login;
