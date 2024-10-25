import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@entities/BmiCalculator";
import { GetPokemonByNameService } from "@services/GetPokemonByName/GetPokemonByNameService";
import { GetPokemonByNameUseCase } from "@useCases/GetPokemonByName/GetPokemonByNameUseCase";

describe('GetPokemonByNameUseCase', () => {
  const bmiCalculator = new BmiCalculator();

  const getPokemonByNameService: GetPokemonByNameService = new GetPokemonByNameService(
    process.env.POKEAPI_URL!,
    process.env.POKEAPI_FIND_ROUTE!,
    bmiCalculator
  );

  const getPokemonByNameUseCase = new GetPokemonByNameUseCase(getPokemonByNameService);

  it('should fetch a pokemon', async () => {
    expect(getPokemonByNameUseCase.execute('pikachu')).resolves.toHaveProperty('name');
  });
});