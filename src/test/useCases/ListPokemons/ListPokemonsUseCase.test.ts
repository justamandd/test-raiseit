import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@entities/BmiCalculator";
import { ListPokemonsService } from "@services/ListPokemons/ListPokemonsService";
import { ListPokemonsUseCase } from "@useCases/ListPokemons/ListPokemonsUseCase";
import { BmiClassifier } from "@entities/BmiClassifier";
import { HeightConverter } from "@entities/HeightConverter";
import { WeightConverter } from "@entities/WeightConverter";

describe('ListPokemonsUseCase', () => {
  const bmiCalculator = new BmiCalculator();
  const bmiClassifier = new BmiClassifier();
  const heightConverter = new HeightConverter();
  const weightConverter = new WeightConverter();

  const listPokemonsService: ListPokemonsService = new ListPokemonsService(
    process.env.POKEAPI_URL!,
    process.env.POKEAPI_LIST_ROUTE!,
    bmiCalculator,
    bmiClassifier,
    weightConverter,
    heightConverter,
  );

  const listPokemonsUseCase = new ListPokemonsUseCase(listPokemonsService);

  it('should fetch pokemons', async () => {
    expect(listPokemonsUseCase.execute(5)).resolves.toHaveLength(5);
  });
});