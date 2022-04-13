import React, { useEffect, useState, createContext, useContext } from "react";
import "./App.css";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import AddFoodStorage from "./components/AddFoodStorage.jsx";
import Storage from "./components/Storage.jsx";
import Item from "./components/Item.jsx";
import ViewRecipes from "./components/ViewRecipes.jsx";
import Login from "./components/Login.jsx";
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
            <Route path="/storage/add" exact element={<AddFoodStorage />} />
            <Route path="/storage/:id" exact element={<Item />} />
            <Route path="/storage" exact element={<Storage />} />
            <Route path="/recipes" exact element={<ViewRecipes />} />
            <Route path="/login" exact element={<Login hasAccount={true} />} />
            <Route
              path="/register"
              exact
              element={<Login hasAccount={false} />}
            />
            <Route path="/" exact element={<Home />} />
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
