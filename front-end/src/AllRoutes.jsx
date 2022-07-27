import React from "react";
import AddItem from "./components/storage/AddItem";
import Storage from "./components/storage/Storage";
import StorageHistory from "./components/storage/StorageHistory";
import Item from "./components/storage/Item";
import Recipes from "./components/recipe/Recipes";
import Login from "./components/Login.tsx";
import Editor from "./components/storage/Editor";
import DiffChecker from "./components/storage/DiffChecker";
import Intro from "./components/Intro";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import ServerFacade from "./api/ServerFacade";

const AllRoutes = ({ user, setUser }) => {
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
        <Route
          path="/login"
          exact
          element={<Login hasAccount={true} setUser={setUser} />}
        />
        <Route path="/storage/edit/:id" exact element={<Editor />} />
        <Route path="/*" exact element={<Storage />} />
      </Routes>
    );
  };

  const getLoggedOutRoutes = () => {
    return (
      <Routes>
        <Route path="/recipes" exact element={<Recipes />} />
        <Route
          path="/login"
          exact
          element={<Login hasAccount={true} setUser={setUser} />}
        />
        <Route
          path="/register"
          exact
          element={<Login hasAccount={false} setUser={setUser} />}
        />
        <Route path="/*" element={<Intro />} />
      </Routes>
    );
  };

  const getRoutes = () => {
    return user ? getLoggedInRoutes() : getLoggedOutRoutes();
  };

  return (
    <BrowserRouter>
      <Nav user={user} setUser={setUser} />
      {getRoutes()}
    </BrowserRouter>
  );
};

export default AllRoutes;
