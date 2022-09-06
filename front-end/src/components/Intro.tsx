import React, { ReactElement } from "react";
// @ts-ignore
import Storage from "./storage/Storage.tsx";
import { User } from "../types";
// @ts-ignore
import SRButtonLink from "../sr-ui/SRButtonLink.tsx";
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

export type IntroProps = {
  user?: User;
};

const Intro: React.FC<IntroProps> = ({ user }: IntroProps): ReactElement => {
  if (user == null) {
    return (
      <SRFlex
        direction="column"
        justifyContent="center"
        alignItems={isMobile ? "center" : "flex-start"}
      >
        <SRContainer maxWidth="large" margin={isMobile ? "medium" : "xxlarge"}>
          <SRHeader size="xlarge" padding="xlarge" underlined>
            Storage Recipe
          </SRHeader>
          <SRHeader>The recipe for better storage management</SRHeader>
          <SRText fontSize="large" padding="medium" margin="xlarge">
            Get started by viewing recipes, logging in, or creating your own
            account.
          </SRText>
          <SRFlex wrap="wrap" justifyContent="space-around">
            <SRButtonLink to="/login">Login</SRButtonLink>
            <SRButtonLink to="/register">Create Account</SRButtonLink>
            <SRButtonLink to="/recipes">See Recipes</SRButtonLink>
          </SRFlex>
        </SRContainer>
      </SRFlex>
    );
  } else {
    return <Storage />;
  }
};

export default Intro;
