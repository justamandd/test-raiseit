import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@entities/BmiCalculator";
import { GetPokemonByNameService } from "@services/GetPokemonByName/GetPokemonByNameService";

describe('GetPokemonByName', () => {
  const bmiCalculator = new BmiCalculator();

  let getPokemonByName: GetPokemonByNameService;

  it('should fetch a pokemon', async () => {
    getPokemonByName = new GetPokemonByNameService(
      process.env.POKEAPI_URL!,
      process.env.POKEAPI_FIND_ROUTE!,
      bmiCalculator
    );

    const pokemon = await getPokemonByName.getPokemonByName("pikachu");

    expect(pokemon.name).toBe("pikachu");
  });

  it('should return a error', async () => {
    getPokemonByName = new GetPokemonByNameService(
      "https://pokeapia.co/api/v2/",
      process.env.POKEAPI_FIND_ROUTE!,
      bmiCalculator
    );

    expect(getPokemonByName.getPokemonByName("pikachu")).rejects.toThrow()
  })
})