import React, { ReactElement } from "react";
import Storage from "./storage/Storage";
import { User } from "../types";
import SRButtonLink from "../sr-ui/SRButtonLink";
import SRLanguageSelector from "../sr-ui/SRLanguageSelector";
import SRHeader from "../sr-ui/SRHeader";
import SRContainer from "../sr-ui/SRContainer";
import SRText from "../sr-ui/SRText";
import SRFlex from "../sr-ui/SRFlex";
import { isMobile } from "../sr-ui/styles";
import { useTranslation } from "react-i18next";

export type IntroProps = {
  user?: User;
};

const Intro: React.FC<IntroProps> = ({ user }: IntroProps): ReactElement => {
  const { t } = useTranslation();
  if (!!user) {
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
