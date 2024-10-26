import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@utils/BmiCalculator";
import { GetPokemonByNameService } from "@services/GetPokemonByNameService";
import { GetPokemonByNameUseCase } from "@useCases/GetPokemonByNameUseCase";
import { BmiClassifier } from "@utils/BmiClassifier";
import { HeightConverter } from "@utils/HeightConverter";
import { WeightConverter } from "@utils/WeightConverter";
import { PokemonFactory } from "@factories/PokemonFactory";

describe('GetPokemonByNameUseCase', () => {
  const bmiCalculator = new BmiCalculator();
  const bmiClassifier = new BmiClassifier();
  const heightConverter = new HeightConverter();
  const weightConverter = new WeightConverter();

  const pokemonFactory = new PokemonFactory(bmiCalculator, bmiClassifier, weightConverter, heightConverter);


  const getPokemonByNameService: GetPokemonByNameService = new GetPokemonByNameService(
    process.env.POKEAPI_URL!,
    process.env.POKEAPI_FIND_ROUTE!,
    pokemonFactory
  );

  const getPokemonByNameUseCase = new GetPokemonByNameUseCase(getPokemonByNameService);

  it('should fetch a pokemon', async () => {
    expect(getPokemonByNameUseCase.execute('pikachu')).resolves.toHaveProperty('name');
  });
});