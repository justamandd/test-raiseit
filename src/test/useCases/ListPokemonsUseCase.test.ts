import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@utils/BmiCalculator";
import { ListPokemonsService } from "@services/ListPokemonsService";
import { ListPokemonsUseCase } from "@useCases/ListPokemonsUseCase";
import { BmiClassifier } from "@utils/BmiClassifier";
import { HeightConverter } from "@utils/HeightConverter";
import { WeightConverter } from "@utils/WeightConverter";

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