import React, {
  useEffect,
  useState,
  createContext,
  ReactElement,
  Suspense,
} from "react";
import "./App.css";
// @ts-ignore
import AllRoutes from "./AllRoutes.tsx";
// @ts-ignore
import ServerFacade from "./api/ServerFacade.ts";
// @ts-ignore
import Toaster from "./sr-ui/Toaster.tsx";
import { ContextType, Language, User } from "./types";
import "./i18n.ts";
import { useTranslation } from "react-i18next";

export const Context = createContext<ContextType>(undefined);

const App: React.FC = (): ReactElement => {
  const { i18n } = useTranslation();

  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    const tryLoggingIn = async (): Promise<void> => {
      const currentUser = await ServerFacade.getLoggedInUser();
      if (!currentUser) return;
      setUser(currentUser);
      console.log("User:", currentUser);
      setLanguage(currentUser.language);
    };
    if (!user) tryLoggingIn();
  }, [user, setUser]);

  return (
    <Suspense fallback="loading">
      <Context.Provider value={{ user, setUser, language, setLanguage }}>
        <AllRoutes user={user} setUser={setUser} />
        <Toaster />
      </Context.Provider>
    </Suspense>
  );
};

export default App;
