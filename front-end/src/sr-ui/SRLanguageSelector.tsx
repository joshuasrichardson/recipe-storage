import React, { useContext, ReactElement } from "react";
import { Context } from "../App";
import { ContextType, Language } from "../types";
import { useTranslation } from "react-i18next";
import SRDropDown from "./SRDropDown";
import ServerFacade from "../api/ServerFacade";

interface LanguageSelectorProps {
  saveToDb?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  saveToDb = false,
}: LanguageSelectorProps): ReactElement => {
  const { user, language, setLanguage } = useContext<ContextType>(Context);
  const { t } = useTranslation();

  const updateLanguage = (newLanguage: Language): void => {
    if (saveToDb) {
      ServerFacade.updateUser({
        ...user,
        language: newLanguage,
      });
    }
    setLanguage(newLanguage);
  };

  return (
    <SRDropDown
      label={t("Language")}
      listName={"language"}
      value={language}
      fixedOptions={true}
      fillBackground={true}
      onChange={(e) => updateLanguage(e.target.value as Language)}
    >
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </SRDropDown>
  );
};

export default LanguageSelector;
