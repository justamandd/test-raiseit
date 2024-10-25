import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@entities/BmiCalculator";
import { GetPokemonByNameService } from "@services/GetPokemonByName/GetPokemonByNameService";
import { GetPokemonByNameUseCase } from "@useCases/GetPokemonByName/GetPokemonByNameUseCase";
import { BmiClassifier } from "@entities/BmiClassifier";
import { HeightConverter } from "@entities/HeightConverter";
import { WeightConverter } from "@entities/WeightConverter";

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