import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@entities/BmiCalculator";
import { ListPokemonsService } from "@services/ListPokemons/ListPokemonsService";

describe('ListPokemonsService', () => {
  const bmiCalculator = new BmiCalculator();

  let listPokemonsService: ListPokemonsService;

  it('should fetch pokemons', async () => {
    listPokemonsService = new ListPokemonsService(
      process.env.POKEAPI_URL!,
      process.env.POKEAPI_LIST_ROUTE!,
      bmiCalculator
    );

    const pokemons = await listPokemonsService.getPokemons(5);

    expect(pokemons).toHaveLength(5);
  });

  it('should return a error', async () => {
    listPokemonsService = new ListPokemonsService(
      "https://pokeapia.co/api/v2/",
      process.env.POKEAPI_LIST_ROUTE!,
      bmiCalculator
    );

    expect(listPokemonsService.getPokemons()).rejects.toThrow()
  })
})