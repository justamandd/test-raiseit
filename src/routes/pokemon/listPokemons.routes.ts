import { Router } from "express";

import { BmiCalculator } from "@entities/BmiCalculator";
import { ListPokemonsService } from "@services/ListPokemons/ListPokemonsService";
import { ListPokemonsController } from "@useCases/ListPokemons/ListPokemonsController";
import { ListPokemonsUseCase } from "@useCases/ListPokemons/ListPokemonsUseCase";
import { BmiClassifier } from "@entities/BmiClassifier";
import { WeightConverter } from "@entities/WeightConverter";
import { HeightConverter } from "@entities/HeightConverter";

const routes  = Router();

const bmiCalculator = new BmiCalculator();
const bmiClassifier = new BmiClassifier();
const weightConverter = new WeightConverter();
const heightConverter = new HeightConverter();

const listPokemonsService = new ListPokemonsService(
  process.env.POKEAPI_URL!, 
  process.env.POKEAPI_LIST_ROUTE!, 
  bmiCalculator,
  bmiClassifier,
  weightConverter,
  heightConverter
);
const listPokemonsUseCase = new ListPokemonsUseCase(listPokemonsService);
const listPokemonsController = new ListPokemonsController(listPokemonsUseCase);

routes.get('/', async (req, res) => {
  await listPokemonsController.handle(req, res);
});

export { routes };