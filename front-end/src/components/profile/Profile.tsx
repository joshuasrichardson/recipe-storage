import React, { useContext, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRContainer from "../../sr-ui/SRContainer.tsx";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
// @ts-ignore
import SRHeader from "../../sr-ui/SRHeader.tsx";
// @ts-ignore
import { Context } from "../../App.tsx";
// @ts-ignore
import { ContextType } from "../../types.ts";
import { useTranslation } from "react-i18next";
// @ts-ignore
import SRLanguageSelector from "../../sr-ui/SRLanguageSelector.tsx";
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";

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
