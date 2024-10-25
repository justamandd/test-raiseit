import { Router } from "express";

import { BmiCalculator } from "@entities/BmiCalculator";
import { GetPokemonByNameService } from "@services/GetPokemonByName/GetPokemonByNameService";
import { GetPokemonByNameUseCase } from "@useCases/GetPokemonByName/GetPokemonByNameUseCase";
import { GetPokemonByNameController } from "@useCases/GetPokemonByName/GetPokemonByNameController";

const routes  = Router();

const bmiCalculator = new BmiCalculator();

const getPokemonByNameService = new GetPokemonByNameService(
  process.env.POKEAPI_URL!, 
  process.env.POKEAPI_FIND_ROUTE!, 
  bmiCalculator
);

const getPokemonByNameUseCase = new GetPokemonByNameUseCase(getPokemonByNameService);
const getPokemonByNameController = new GetPokemonByNameController(getPokemonByNameUseCase);

routes.get('/:name', async (req, res) => {
  await getPokemonByNameController.handle(req, res);
});

export { routes };