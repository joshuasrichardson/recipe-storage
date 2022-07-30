import React, { ReactElement } from "react";
import AddItem from "./components/storage/AddItem";
import Storage from "./components/storage/Storage";
import StorageHistory from "./components/storage/StorageHistory";
import Item from "./components/storage/Item";
import Recipes from "./components/recipe/Recipes";
// @ts-ignore
import Login from "./components/Login.tsx";
import Editor from "./components/storage/Editor";
import DiffChecker from "./components/storage/DiffChecker";
// @ts-ignore
import Intro from "./components/Intro.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// @ts-ignore
import Nav from "./components/Nav.tsx";
import ServerFacade from "./api/ServerFacade";
import { User } from "./types";

export type AllRoutesParams = {
  user: User;
  setUser: (user: User) => void;
};

const AllRoutes: React.FC<AllRoutesParams> = ({
  user,
  setUser,
}: AllRoutesParams): ReactElement => {
  const getLoggedInRoutes = () => {
    return (
      <Routes>
        <Route path="/storage/add" element={<AddItem />} />
        <Route
          path="/storage/:id"
          element={<Item canEdit getItem={ServerFacade.getItem} />}
        />
        <Route
          path="/storage/history/:id"
          element={<Item getItem={ServerFacade.getHistoryItem} />}
        />
        <Route path="/storage/history" element={<StorageHistory />} />
        <Route path="/item/update" element={<DiffChecker />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route
          path="/login"
          element={<Login hasAccount={true} setUser={setUser} />}
        />
        <Route path="/storage/edit/:id" element={<Editor />} />
        <Route path="/*" element={<Storage />} />
      </Routes>
    );
  };

  const getLoggedOutRoutes = () => {
    return (
      <Routes>
        <Route path="/recipes" element={<Recipes />} />
        <Route
          path="/login"
          element={<Login hasAccount={true} setUser={setUser} />}
        />
        <Route
          path="/register"
          element={<Login hasAccount={false} setUser={setUser} />}
        />
        <Route path="/*" element={<Intro user={user} />} />
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
