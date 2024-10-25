import { Router } from "express";
import { routes as pokemonRoutes } from "@routes/pokemon";

const routes  = Router();

routes.use(pokemonRoutes);

export { routes };