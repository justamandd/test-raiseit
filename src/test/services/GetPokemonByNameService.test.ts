import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@entities/BmiCalculator";
import { GetPokemonByNameService } from "@services/GetPokemonByName/GetPokemonByNameService";
import { BmiClassifier } from "@entities/BmiClassifier";
import { HeightConverter } from "@entities/HeightConverter";
import { WeightConverter } from "@entities/WeightConverter";

describe('GetPokemonByName', () => {
  const bmiCalculator = new BmiCalculator();
  const bmiClassifier = new BmiClassifier();
  const heightConverter = new HeightConverter();
  const weightConverter = new WeightConverter();

  let getPokemonByName: GetPokemonByNameService;

  it('should fetch a pokemon', async () => {
    getPokemonByName = new GetPokemonByNameService(
      process.env.POKEAPI_URL!,
      process.env.POKEAPI_FIND_ROUTE!,
      bmiCalculator,
      bmiClassifier,
      weightConverter,
      heightConverter,
    );

    const pokemon = await getPokemonByName.getPokemonByName("pikachu");

    expect(pokemon.name).toBe("pikachu");
  });

  it('should return a error by wrong url', async () => {
    getPokemonByName = new GetPokemonByNameService(
      "https://pokeapia.co/api/v2/",
      process.env.POKEAPI_FIND_ROUTE!,
      bmiCalculator,
      bmiClassifier,
      weightConverter,
      heightConverter,
    );

    expect(getPokemonByName.getPokemonByName("pikachu")).rejects.toThrow()
  })

  it('should return a error by wrong pokemon name', async () => {
    getPokemonByName = new GetPokemonByNameService(
      process.env.POKEAPI_URL!,
      process.env.POKEAPI_FIND_ROUTE!,
      bmiCalculator,
      bmiClassifier,
      weightConverter,
      heightConverter,
    );

    expect(getPokemonByName.getPokemonByName("pikach")).rejects.toThrow()
  })
})