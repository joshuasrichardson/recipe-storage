import React, { useContext, ReactElement } from "react";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRContainer from "../../sr-ui/SRContainer.tsx";
// @ts-ignore
import SRHeader from "../../sr-ui/SRHeader.tsx";
// @ts-ignore
import { Context } from "../../App.tsx";
// @ts-ignore
import { ContextType } from "../../types.ts";
import { useTranslation } from "react-i18next";
// @ts-ignore
import SRLanguageSelector from "../../sr-ui/SRLanguageSelector.tsx";

const Profile: React.FC = (): ReactElement => {
  const { user } = useContext<ContextType>(Context);
  const { t } = useTranslation();

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
          justifyContent="space-around"
          alignItems="stretch"
        >
          <SRLanguageSelector />
        </SRFlex>
      </SRContainer>
    </SRFlex>
  );
};

export default Profile;
