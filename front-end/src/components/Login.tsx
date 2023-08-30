import React, { ReactElement, useContext, useState } from "react";
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
import { isMobile, themeRed } from "../sr-ui/styles.ts";
// @ts-ignore
import SRLanguageSelector from "../sr-ui/SRLanguageSelector.tsx";
// @ts-ignore
import { useTranslation } from "react-i18next";
// @ts-ignore
import { Context } from "../App.tsx";

export type LoginProps = {
  hasAccount?: boolean;
};

const Login: React.FC<LoginProps> = ({
  hasAccount,
}: LoginProps): ReactElement => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser, language } = useContext(Context);

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
      language,
      onSuccess: onLoggedIn,
      onFailure: setErr,
    });
  };

  const useAccount = async (e): Promise<void> => {
    e.preventDefault();
    hasAccount ? login() : register();
  };

  return (
    <SRFlex
      direction="column"
      justifyContent="center"
      alignItems={isMobile ? "center" : "flex-start"}
    >
      <SRContainer maxWidth="large" margin={isMobile ? "medium" : "xxlarge"}>
        <SRHeader size="xlarge" padding="xlarge" underlined>
          {t("Storage Recipe")}
        </SRHeader>
        <SRForm onSubmit={useAccount} padding="large">
          {!hasAccount && (
            <>
              <SRTextInput
                id="first-name"
                label={t("First Name")}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fillBackground
              />
              <SRTextInput
                id="last-name"
                label={t("Last Name")}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fillBackground
              />
            </>
          )}
          <SRTextInput
            id="username"
            label={t("Username")}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fillBackground
          />
          <SRTextInput
            id="password"
            label={t("Password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fillBackground
          />
          {!hasAccount && (
            <>
              <SRTextInput
                id="password2"
                label={t("Confirm Password")}
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                fillBackground
              />
              <SRLanguageSelector saveToDb={false} />
            </>
          )}
          <SRText style={{ textAlign: "center" }} color={themeRed}>
            {err}
          </SRText>
          <SRFlex direction="column">
            <SRButton dataTestid="login-button" onClick={useAccount}>
              {hasAccount && t("Login")}
              {!hasAccount && t("Create")}
            </SRButton>
            <a
              href={hasAccount ? "/register" : "/login"}
              style={{ margin: "15px" }}
            >
              {hasAccount
                ? t("Don't have an account? Click here to create one.")
                : t("Have an account? Click here to login.")}
            </a>
          </SRFlex>
        </SRForm>
      </SRContainer>
    </SRFlex>
  );
};

export default Login;
