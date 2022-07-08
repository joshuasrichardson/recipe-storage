import React, { useContext } from "react";
import AddItem from "./components/AddItem.jsx";
import Storage from "./components/Storage.jsx";
import { Context } from "./App";
import StorageHistory from "./components/StorageHistory.jsx";
import Item from "./components/Item.jsx";
import Recipes from "./components/Recipes.jsx";
import Login from "./components/Login.jsx";
import Editor from "./components/Editor.jsx";
import DiffChecker from "./components/DiffChecker.jsx";
import Intro from "./components/Intro.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import ServerFacade from "./api/ServerFacade";

const AllRoutes = () => {
  const { user } = useContext(Context);

  const getLoggedInRoutes = () => {
    return (
      <Routes>
        <Route path="/storage/add" exact element={<AddItem />} />
        <Route
          path="/storage/:id"
          exact
          element={<Item canEdit getItem={ServerFacade.getItem} />}
        />
        <Route
          path="/storage/history/:id"
          exact
          element={<Item getItem={ServerFacade.getHistoryItem} />}
        />
        <Route path="/storage/history" exact element={<StorageHistory />} />
        <Route path="/item/update" exact element={<DiffChecker />} />
        <Route path="/recipes" exact element={<Recipes />} />
        <Route path="/login" exact element={<Login hasAccount={true} />} />
        <Route path="/storage/edit/:id" exact element={<Editor />} />
        <Route path="/*" exact element={<Storage />} />
      </Routes>
    );
  };

  const getLoggedOutRoutes = () => {
    return (
      <Routes>
        <Route path="/recipes" exact element={<Recipes />} />
        <Route path="/login" exact element={<Login hasAccount={true} />} />
        <Route path="/register" exact element={<Login hasAccount={false} />} />
        <Route path="/*" element={<Intro />} />
      </Routes>
    );
  };

  const getRoutes = () => {
    return user ? getLoggedInRoutes() : getLoggedOutRoutes();
  };

  return (
    <BrowserRouter>
      <Nav />
      {getRoutes()}
    </BrowserRouter>
  );
};

export default AllRoutes;
