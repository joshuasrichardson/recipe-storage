import AddItem from "./components/AddItem.jsx";
import Storage from "./components/Storage.jsx";
import StorageHistory from "./components/StorageHistory.jsx";
import Item from "./components/Item.jsx";
import ViewRecipes from "./components/ViewRecipes.jsx";
import Login from "./components/Login.jsx";
import Editor from "./components/Editor.jsx";
import DiffChecker from "./components/DiffChecker.jsx";
import Intro from "./components/Intro.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import ServerFacade from "./api/ServerFacade";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Nav />
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
        <Route path="/storage/edit/:id" exact element={<Editor />} />
        <Route path="/storage" exact element={<Storage />} />
        <Route path="/storage/history" exact element={<StorageHistory />} />
        <Route path="/item/update" exact element={<DiffChecker />} />
        <Route path="/recipes" exact element={<ViewRecipes />} />
        <Route path="/login" exact element={<Login hasAccount={true} />} />
        <Route path="/register" exact element={<Login hasAccount={false} />} />
        <Route path="/" exact element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
