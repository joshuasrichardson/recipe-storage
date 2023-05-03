import React, { ReactElement } from "react";
// @ts-ignore
import Profile from "./components/profile/Profile.tsx";
// @ts-ignore
import AddItem from "./components/storage/AddItem.tsx";
// @ts-ignore
import Storage from "./components/storage/Storage.tsx";
// @ts-ignore
import StorageHistory from "./components/storage/StorageHistory.tsx";
// @ts-ignore
import ItemComponent from "./components/storage/Item.tsx";
// @ts-ignore
import Recipes from "./components/recipe/Recipes.tsx";
// @ts-ignore
import Login from "./components/Login.tsx";
// @ts-ignore
import Editor from "./components/storage/Editor.tsx";
// @ts-ignore
import DiffChecker from "./components/storage/DiffChecker.tsx";
// @ts-ignore
import Intro from "./components/Intro.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// @ts-ignore
import Nav from "./components/Nav.tsx";
// @ts-ignore
import ServerFacade from "./api/ServerFacade.ts";
import { User } from "./types";
// @ts-ignore
import AddRecipe from "./components/recipe/AddRecipe.tsx";
// @ts-ignore
import RecipeComponent from "./components/recipe/Recipe.tsx";
// @ts-ignore
import MakeRecipe from "./components/recipe/MakeRecipe.tsx";

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/storage/add" element={<AddItem />} />
        <Route
          path="/storage/:id"
          element={<ItemComponent canEdit getItem={ServerFacade.getItem} />}
        />
        <Route
          path="/storage/history/:id"
          element={
            <ItemComponent
              canEdit={false}
              getItem={ServerFacade.getHistoryItem}
            />
          }
        />
        <Route path="/storage/history" element={<StorageHistory />} />
        <Route path="/item/update" element={<DiffChecker />} />
        <Route path="/recipes/add" element={<AddRecipe />} />
        <Route path="/recipes/make/:id" element={<MakeRecipe />} />
        <Route
          path="/recipes/:id"
          element={
            <RecipeComponent
              canEdit={["joshumi", "testuser"].includes(user.username)}
            />
          }
        />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/login" element={<Login hasAccount={true} />} />
        <Route path="/storage/edit/:id" element={<Editor />} />
        <Route path="/*" element={<Storage />} />
      </Routes>
    );
  };

  const getLoggedOutRoutes = () => {
    return (
      <Routes>
        <Route path="/recipes/make/:id" element={<MakeRecipe />} />
        <Route
          path="/recipes/:id"
          element={<RecipeComponent canEdit={false} />}
        />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/login" element={<Login hasAccount={true} />} />
        <Route path="/register" element={<Login hasAccount={false} />} />
        <Route path="/*" element={<Intro user={user} />} />
      </Routes>
    );
  };

  const getRoutes = () => {
    return user ? getLoggedInRoutes() : getLoggedOutRoutes();
  };

  return (
    <BrowserRouter>
      <Nav user={user} />
      {getRoutes()}
    </BrowserRouter>
  );
};

export default AllRoutes;
