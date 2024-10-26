import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@utils/BmiCalculator";
import { GetPokemonByNameService } from "@services/GetPokemonByNameService";
import { GetPokemonByNameUseCase } from "@useCases/GetPokemonByNameUseCase";
import { BmiClassifier } from "@utils/BmiClassifier";
import { HeightConverter } from "@utils/HeightConverter";
import { WeightConverter } from "@utils/WeightConverter";

describe('GetPokemonByNameUseCase', () => {
  const bmiCalculator = new BmiCalculator();
  const bmiClassifier = new BmiClassifier();
  const heightConverter = new HeightConverter();
  const weightConverter = new WeightConverter();

  const getPokemonByNameService: GetPokemonByNameService = new GetPokemonByNameService(
    process.env.POKEAPI_URL!,
    process.env.POKEAPI_FIND_ROUTE!,
    bmiCalculator,
    bmiClassifier,
    weightConverter,
    heightConverter,
  );

  const getPokemonByNameUseCase = new GetPokemonByNameUseCase(getPokemonByNameService);

  it('should fetch a pokemon', async () => {
    expect(getPokemonByNameUseCase.execute('pikachu')).resolves.toHaveProperty('name');
  });
});