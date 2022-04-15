import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import AllRoutes from "./AllRoutes";
import ServerFacade from "./api/ServerFacade";

export const Context = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    if (user == null) {
      const currentUser = await ServerFacade.getLoggedInUser();
      setUser(currentUser);
    }
  });

  return (
    <Context.Provider value={{ user: user, setUser }}>
      <div className="App">
        <AllRoutes />
      </div>
    </Context.Provider>
  );
}

export default App;
