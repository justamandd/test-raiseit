import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@utils/BmiCalculator";
import { ListPokemonsService } from "@services/ListPokemonsService";
import { BmiClassifier } from "@utils/BmiClassifier";
import { HeightConverter } from "@utils/HeightConverter";
import { WeightConverter } from "@utils/WeightConverter";
import { PokemonFactory } from "@factories/PokemonFactory";

describe('ListPokemonsService', () => {
  const bmiCalculator = new BmiCalculator();
  const bmiClassifier = new BmiClassifier();
  const heightConverter = new HeightConverter();
  const weightConverter = new WeightConverter();

  const pokemonFactory = new PokemonFactory(bmiCalculator, bmiClassifier, weightConverter, heightConverter);

  let listPokemonsService: ListPokemonsService;

  it('should fetch pokemons', async () => {
    listPokemonsService = new ListPokemonsService(
      process.env.POKEAPI_URL!,
      process.env.POKEAPI_LIST_ROUTE!,
      pokemonFactory
    );

    const pokemons = await listPokemonsService.getPokemons(5);

    expect(pokemons).toHaveLength(5);
  });

  it('should return a error', async () => {
    listPokemonsService = new ListPokemonsService(
      "https://pokeapia.co/api/v2/",
      process.env.POKEAPI_LIST_ROUTE!,
      pokemonFactory
    );

    expect(listPokemonsService.getPokemons()).rejects.toThrow()
  })
})