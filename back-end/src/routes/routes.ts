import users from "./users-routes";
import recipes from "./recipes-routes";
import storage from "./storage-routes";
import products from "./products-routes";
import containers from "./containers-routes";
import calls from "./calls-routes";
import mealPlans from "./meal-plans-routes";
import { Route } from "../types";

const routes: Route[] = [
  { path: "/api/users", router: users },
  { path: "/api/recipes", router: recipes },
  { path: "/api/storage", router: storage },
  { path: "/api/products", router: products },
  { path: "/api/containers", router: containers },
  { path: "/api/calls", router: calls },
  { path: "/api/meal-plans", router: mealPlans },
];

export default routes;
