import React, { useEffect, useState, createContext, ReactElement } from "react";
import "./App.css";
// @ts-ignore
import AllRoutes from "./AllRoutes.tsx";
import ServerFacade from "./api/ServerFacade";
// @ts-ignore
import Toaster from "./components/Toaster.tsx";
import { User } from "./types";

export const Context = createContext(undefined);

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
      <div className="App">
        <AllRoutes user={user} setUser={setUser} />
        <Toaster />
      </div>
    </Context.Provider>
  );
};

export default App;
