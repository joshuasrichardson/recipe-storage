import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import AllRoutes from "./AllRoutes";
import ServerFacade from "./api/ServerFacade";
import { Toaster } from "./components/Toaster";

export const Context = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tryLoggingIn = async () => {
      if (user == null) {
        const currentUser = await ServerFacade.getLoggedInUser();
        setUser(currentUser);
      }
    };
    tryLoggingIn();
  }, [user, setUser]);

  return (
    <Context.Provider value={{ user: user, setUser }}>
      <div className="App">
        <AllRoutes />
        <Toaster />
      </div>
    </Context.Provider>
  );
}

export default App;
