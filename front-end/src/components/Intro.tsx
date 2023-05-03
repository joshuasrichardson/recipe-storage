import React, { ReactElement } from "react";
// @ts-ignore
import Storage from "./storage/Storage.tsx";
import { User } from "../types";
// @ts-ignore
import SRButtonLink from "../sr-ui/SRButtonLink.tsx";
// @ts-ignore
import SRLanguageSelector from "../sr-ui/SRLanguageSelector.tsx";
// @ts-ignore
import SRHeader from "../sr-ui/SRHeader.tsx";
// @ts-ignore
import SRContainer from "../sr-ui/SRContainer.tsx";
// @ts-ignore
import SRText from "../sr-ui/SRText.tsx";
// @ts-ignore
import SRFlex from "../sr-ui/SRFlex.tsx";
// @ts-ignore
import { isMobile } from "../sr-ui/styles.ts";
// @ts-ignore
import { useTranslation } from "react-i18next";

export type IntroProps = {
  user?: User;
};

const Intro: React.FC<IntroProps> = ({ user }: IntroProps): ReactElement => {
  const { t } = useTranslation();
  if (user == null) {
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
          <SRHeader>{t("The recipe for better storage management")}</SRHeader>
          <SRFlex
            direction="column"
            width="small"
            wrap="nowrap"
            justifyContent="center"
          >
            <SRLanguageSelector saveToDb={false} />
          </SRFlex>
          <SRText fontSize="large" padding="medium" margin="xlarge">
            {t(
              "Get started by viewing recipes, logging in, or creating your own account."
            )}
          </SRText>
          <SRFlex wrap="wrap" justifyContent="space-around">
            <SRButtonLink to="/login">{t("Login")}</SRButtonLink>
            <SRButtonLink to="/register">{t("Create Account")}</SRButtonLink>
            <SRButtonLink to="/recipes">{t("See Recipes")}</SRButtonLink>
          </SRFlex>
        </SRContainer>
      </SRFlex>
    );
  } else {
    return <Storage />;
  }
};

export default Intro;
