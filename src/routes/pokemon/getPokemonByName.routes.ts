import { Router } from "express";

import { BmiCalculator } from "@utils/BmiCalculator";
import { GetPokemonByNameService } from "@services/GetPokemonByNameService";
import { GetPokemonByNameUseCase } from "@useCases/GetPokemonByNameUseCase";
import { GetPokemonByNameController } from "@controllers/GetPokemonByNameController";
import { BmiClassifier } from "@utils/BmiClassifier";
import { WeightConverter } from "@utils/WeightConverter";
import { HeightConverter } from "@utils/HeightConverter";
import { validatePokemonName } from "@middlewares/validatePokemonName";
import { PokemonFactory } from "@factories/PokemonFactory";

const routes  = Router();

const bmiCalculator = new BmiCalculator();
const bmiClassifier = new BmiClassifier();
const weightConverter = new WeightConverter();
const heightConverter = new HeightConverter();

const pokemonFactory = new PokemonFactory(bmiCalculator, bmiClassifier, weightConverter, heightConverter);

const getPokemonByNameService = new GetPokemonByNameService(
  process.env.POKEAPI_URL!, 
  process.env.POKEAPI_FIND_ROUTE!, 
  pokemonFactory
);

const getPokemonByNameUseCase = new GetPokemonByNameUseCase(getPokemonByNameService);
const getPokemonByNameController = new GetPokemonByNameController(getPokemonByNameUseCase);

routes.get('/:name', validatePokemonName, async (req, res) => {
  await getPokemonByNameController.handle(req, res);
});

export { routes };