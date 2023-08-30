import React, { ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServerFacade from "../api/ServerFacade";
import SRButton from "../sr-ui/SRButton";
import { User } from "../types";
import SRHeader from "../sr-ui/SRHeader";
import SRContainer from "../sr-ui/SRContainer";
import SRFlex from "../sr-ui/SRFlex";
import SRText from "../sr-ui/SRText";
import SRTextInput from "../sr-ui/SRTextInput";
import SRForm from "../sr-ui/SRForm";
import { isMobile, themeRed } from "../sr-ui/styles";
import SRLanguageSelector from "../sr-ui/SRLanguageSelector";
import { useTranslation } from "react-i18next";
import { Context } from "../App";

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
            <SRButton onClick={useAccount}>
              {hasAccount && t(hasAccount ? "Login" : "Create")}
            </SRButton>
            <a
              href={hasAccount ? "/register" : "/login"}
              style={{ margin: "15px" }}
            >
              {t(
                hasAccount
                  ? "Don't have an account? Click here to create one."
                  : "Have an account? Click here to login."
              )}
            </a>
          </SRFlex>
        </SRForm>
      </SRContainer>
    </SRFlex>
  );
};

export default Login;
