import React, {
  useEffect,
  useState,
  createContext,
  ReactElement,
  Suspense,
} from "react";
import "./App.css";
import AllRoutes from "./AllRoutes";
import ServerFacade from "./api/ServerFacade";
import Toaster from "./sr-ui/Toaster";
import { ContextType, Language, User } from "./types";
import "./i18n";
import { useTranslation } from "react-i18next";

export const Context = createContext<ContextType>(undefined);

const App: React.FC = (): ReactElement => {
  const { i18n } = useTranslation();

  const [user, setUser] = useState<User>(null);
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    const tryLoggingIn = async (): Promise<void> => {
      const currentUser = await ServerFacade.getLoggedInUser();
      if (currentUser) {
        setUser(currentUser);
        setLanguage(currentUser.language);
      }
    };
    if (user) setLanguage(user.language);
    else tryLoggingIn();
  }, [user, setUser]);

  return (
    <Suspense fallback="loading">
      <Context.Provider value={{ user, setUser, language, setLanguage }}>
        <AllRoutes user={user} />
        <Toaster />
      </Context.Provider>
    </Suspense>
  );
};

export default App;
