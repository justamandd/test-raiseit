import { Router } from "express";
import { routes as listPokemonsRoute } from "@routes/pokemon/listPokemons.routes";
import { routes as getPokemonByNameRoute } from "./getPokemonByName.routes";

const routes  = Router();

routes.use("/pokemons",listPokemonsRoute);
routes.use("/pokemons",getPokemonByNameRoute);

export { routes };