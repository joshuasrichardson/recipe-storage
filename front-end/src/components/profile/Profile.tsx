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
import { ContextType, Language } from "../../types.ts";
import { useTranslation } from "react-i18next";
// @ts-ignore
import SRDropDown from "../../sr-ui/SRDropDown.tsx";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";

const Profile: React.FC = (): ReactElement => {
  const { user, language, setLanguage } = useContext<ContextType>(Context);
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
          <SRDropDown
            label={t("Language")}
            listName={"language"}
            value={language}
            fixedOptions={true}
            onChange={(e) => {
              ServerFacade.updateUser({
                ...user,
                language: e.target.value as Language,
              });
              setLanguage(e.target.value as Language);
            }}
          >
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </SRDropDown>
        </SRFlex>
      </SRContainer>
    </SRFlex>
  );
};

export default Profile;
