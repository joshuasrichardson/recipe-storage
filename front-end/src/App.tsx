import React, { useEffect, useState, createContext, ReactElement } from "react";
import "./App.css";
// @ts-ignore
import AllRoutes from "./AllRoutes.tsx";
// @ts-ignore
import ServerFacade from "./api/ServerFacade.ts";
// @ts-ignore
import Toaster from "./sr-ui/Toaster.tsx";
import { ContextType, User } from "./types";

export const Context = createContext<ContextType>(undefined);

const App: React.FC = (): ReactElement => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const tryLoggingIn = async (): Promise<void> => {
      if (!user) {
        const currentUser = await ServerFacade.getLoggedInUser();
        setUser(currentUser);
      }
    };
    tryLoggingIn();
  }, [user, setUser]);

  return (
    <Context.Provider value={{ user, setUser }}>
      <AllRoutes user={user} setUser={setUser} />
      <Toaster />
    </Context.Provider>
  );
};

export default App;
