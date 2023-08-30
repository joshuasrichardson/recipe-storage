import React, { useContext, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import SRFlex from "../../sr-ui/SRFlex";
import SRContainer from "../../sr-ui/SRContainer";
import ServerFacade from "../../api/ServerFacade";
import SRHeader from "../../sr-ui/SRHeader";
import { Context } from "../../App";
import { ContextType } from "../../types";
import { useTranslation } from "react-i18next";
import SRLanguageSelector from "../../sr-ui/SRLanguageSelector";
import SRButton from "../../sr-ui/SRButton";

const Profile: React.FC = (): ReactElement => {
  const { user, setUser } = useContext<ContextType>(Context);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logout = async (): Promise<void> => {
    await ServerFacade.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <SRFlex direction="column">
      <SRContainer padding="none" maxWidth="xlarge">
        <SRFlex direction="column" padding="large">
          <SRHeader size="large" underlined>
            {t("placeholder Profile", { user: user.firstName })}
          </SRHeader>
        </SRFlex>
        <SRFlex
          padding="large"
          wrap="wrap"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <SRLanguageSelector saveToDb={true} />
          <SRButton
            style={{ marginLeft: 0, marginRight: 0 }}
            variant="secondary"
            onClick={logout}
          >
            {t("Logout")}
          </SRButton>
        </SRFlex>
      </SRContainer>
    </SRFlex>
  );
};

export default Profile;
