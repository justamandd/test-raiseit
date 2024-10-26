import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@utils/BmiCalculator";
import { ListPokemonsService } from "@services/ListPokemonsService";
import { BmiClassifier } from "@utils/BmiClassifier";
import { HeightConverter } from "@utils/HeightConverter";
import { WeightConverter } from "@utils/WeightConverter";

describe('ListPokemonsService', () => {
  const bmiCalculator = new BmiCalculator();
  const bmiClassifier = new BmiClassifier();
  const heightConverter = new HeightConverter();
  const weightConverter = new WeightConverter();

  let listPokemonsService: ListPokemonsService;

  it('should fetch pokemons', async () => {
    listPokemonsService = new ListPokemonsService(
      process.env.POKEAPI_URL!,
      process.env.POKEAPI_LIST_ROUTE!,
      bmiCalculator,
      bmiClassifier,
      weightConverter,
      heightConverter,
    );

    const pokemons = await listPokemonsService.getPokemons(5);

    expect(pokemons).toHaveLength(5);
  });

  it('should return a error', async () => {
    listPokemonsService = new ListPokemonsService(
      "https://pokeapia.co/api/v2/",
      process.env.POKEAPI_LIST_ROUTE!,
      bmiCalculator,
      bmiClassifier,
      weightConverter,
      heightConverter,
    );

    expect(listPokemonsService.getPokemons()).rejects.toThrow()
  })
})