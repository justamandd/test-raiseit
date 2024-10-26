import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@utils/BmiCalculator";
import { GetPokemonByNameService } from "@services/GetPokemonByNameService";
import { BmiClassifier } from "@utils/BmiClassifier";
import { HeightConverter } from "@utils/HeightConverter";
import { WeightConverter } from "@utils/WeightConverter";
import { PokemonFactory } from "@factories/PokemonFactory";

describe('GetPokemonByName', () => {
  const bmiCalculator = new BmiCalculator();
  const bmiClassifier = new BmiClassifier();
  const heightConverter = new HeightConverter();
  const weightConverter = new WeightConverter();

  const pokemonFactory = new PokemonFactory(bmiCalculator, bmiClassifier, weightConverter, heightConverter);


  let getPokemonByName: GetPokemonByNameService;

  it('should fetch a pokemon', async () => {
    getPokemonByName = new GetPokemonByNameService(
      process.env.POKEAPI_URL!,
      process.env.POKEAPI_FIND_ROUTE!,
      pokemonFactory,
    );

    const pokemon = await getPokemonByName.getPokemonByName("pikachu");

    expect(pokemon.name).toBe("pikachu");
  });

  it('should return a error by wrong url', async () => {
    getPokemonByName = new GetPokemonByNameService(
      "https://pokeapia.co/api/v2/",
      process.env.POKEAPI_FIND_ROUTE!,
      pokemonFactory,
    );

    expect(getPokemonByName.getPokemonByName("pikachu")).rejects.toThrow()
  })

  it('should return a error by wrong pokemon name', async () => {
    getPokemonByName = new GetPokemonByNameService(
      process.env.POKEAPI_URL!,
      process.env.POKEAPI_FIND_ROUTE!,
      pokemonFactory
    );

    expect(getPokemonByName.getPokemonByName("pikach")).rejects.toThrow()
  })
})