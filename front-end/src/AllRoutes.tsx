import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Profile from "./components/profile/Profile";
import AddItem from "./components/storage/AddItem";
import Storage from "./components/storage/Storage";
import StorageHistory from "./components/storage/StorageHistory";
import ItemComponent from "./components/storage/Item";
import Recipes from "./components/recipe/Recipes";
import Login from "./components/Login";
import Editor from "./components/storage/Editor";
import DiffChecker from "./components/storage/DiffChecker";
import Intro from "./components/Intro";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ServerFacade from "./api/ServerFacade";
import { User } from "./types";
import AddRecipe from "./components/recipe/AddRecipe";
import RecipeComponent from "./components/recipe/Recipe";
import EditRecipe from "./components/recipe/EditRecipe";
import MakeRecipe from "./components/recipe/MakeRecipe";
import MealPlanner from "./components/meal-planner/MealPlanner";

export type AllRoutesParams = {
  user: User;
};

const AllRoutes: React.FC<AllRoutesParams> = ({ user }): ReactElement => {
  const LoggedInRoutes = useCallback(() => {
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
        <Route path="/recipes/edit/:id" element={<EditRecipe />} />
        <Route
          path="/recipes/:id"
          element={
            <RecipeComponent
              canEdit={["joshumi", "testuser"].includes(user.username)}
            />
          }
        />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/login" element={<Login hasAccount={true} />} />
        <Route path="/storage/edit/:id" element={<Editor />} />
        <Route path="/*" element={<Storage />} />
      </Routes>
    );
  }, [user]);

  const LoggedOutRoutes = useCallback(() => {
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
  }, [user]);

  const [routes, setRoutes] = useState(
    user ? <LoggedInRoutes /> : <LoggedOutRoutes />
  );

  useEffect(() => {
    setRoutes(user ? <LoggedInRoutes /> : <LoggedOutRoutes />);
  }, [user, LoggedInRoutes, LoggedOutRoutes]);

  return (
    <BrowserRouter>
      <NavBar user={user} />
      {routes}
    </BrowserRouter>
  );
};

export default AllRoutes;
