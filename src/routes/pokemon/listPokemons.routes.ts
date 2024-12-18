import { Router } from "express";

import { BmiCalculator } from "@utils/BmiCalculator";
import { ListPokemonsService } from "@services/ListPokemonsService";
import { ListPokemonsController } from "@controllers/ListPokemonsController";
import { ListPokemonsUseCase } from "@useCases/ListPokemonsUseCase";
import { BmiClassifier } from "@utils/BmiClassifier";
import { WeightConverter } from "@utils/WeightConverter";
import { HeightConverter } from "@utils/HeightConverter";
import { validatePokemonLimit } from "@middlewares/validatePokemonLimit";
import { PokemonFactory } from "@factories/PokemonFactory";

const routes  = Router();

const bmiCalculator = new BmiCalculator();
const bmiClassifier = new BmiClassifier();
const weightConverter = new WeightConverter();
const heightConverter = new HeightConverter();
const pokemonFactory = new PokemonFactory(bmiCalculator, bmiClassifier, weightConverter, heightConverter);

const listPokemonsService = new ListPokemonsService(
  process.env.POKEAPI_URL!, 
  process.env.POKEAPI_LIST_ROUTE!,
  pokemonFactory
);
const listPokemonsUseCase = new ListPokemonsUseCase(listPokemonsService);
const listPokemonsController = new ListPokemonsController(listPokemonsUseCase);

routes.get('/', validatePokemonLimit, async (req, res) => {
  await listPokemonsController.handle(req, res);
});

export { routes };