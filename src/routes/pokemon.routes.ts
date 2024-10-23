import { Router } from "express";

import { BmiCalculator } from "@entities/BmiCalculator";
import { ListPokemonsService } from "@services/ListPokemons/ListPokemonsService";
import { ListPokemonsController } from "@useCases/ListPokemons/ListPokemonsController";
import { ListPokemonsUseCase } from "@useCases/ListPokemons/ListPokemonsUseCase";

const routes  = Router();

const bmiCalculator = new BmiCalculator();

const listPokemonsService = new ListPokemonsService(
  process.env.POKEAPI_URL!, 
  process.env.POKEAPI_LIST_ROUTE!, 
  bmiCalculator
);
const listPokemonsUseCase = new ListPokemonsUseCase(listPokemonsService);
const listPokemonsController = new ListPokemonsController(listPokemonsUseCase);

routes.get('/pokemons', async (req, res) => {
  await listPokemonsController.handle(req, res);
});

export { routes };