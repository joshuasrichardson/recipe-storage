import React, { useEffect, useState, createContext, useContext } from "react";
import "./App.css";
import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";
import AddFoodStorage from "./components/AddFoodStorage.js";
import ViewFoodStorage from "./components/ViewFoodStorage.js";
import ViewRecipes from "./components/ViewRecipes.js";
import Login from "./components/Login.js";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import axios from "axios";

export const Context = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(async () => {
    if (user == null) {
      // TODO: Stop this from happening right after they log out.
      let response = await axios.get("/api/users");
      console.log(response);
      setUser(response.data.user);
    }
  });

  return (
    <Context.Provider value={{ user: user, setUser }}>
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" exact="exact" element={<Home />} />
            <Route path="/add-item" element={<AddFoodStorage />} />
            <Route path="/view-items" element={<ViewFoodStorage />} />
            <Route
              path="/view-recipes"
              exact="exact"
              element={<ViewRecipes />}
            />
            <Route path="/login" element={<Login hasAccount={true} />} />
            <Route path="/register" element={<Login hasAccount={false} />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

const Home = () => {
  const { user } = useContext(Context);

  if (user == null) {
    return (
      <div className="page">
        <div className="main-container">
          <h1>Recipe Storage</h1>
          <p className="call-to-action">
            Get started by viewing recipes or creating your own account.
          </p>
          <div className="selections-container">
            <Link to="/view-recipes" className="button-link">
              <button>See Recipes</button>
            </Link>
            <Link to="/register" className="button-link">
              <button>Create Account</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <AddFoodStorage />;
  }
};

export default App;
