import dotenv from "dotenv";
dotenv.config();

import { BmiCalculator } from "@entities/BmiCalculator";
import { ListPokemonsService } from "@services/ListPokemons/ListPokemonsService";
import { ListPokemonsUseCase } from "@useCases/ListPokemons/ListPokemonsUseCase";

describe('ListPokemonsUseCase', () => {
  const bmiCalculator = new BmiCalculator();

  const listPokemonsService: ListPokemonsService = new ListPokemonsService(
    process.env.POKEAPI_URL!,
    process.env.POKEAPI_LIST_ROUTE!,
    bmiCalculator
  );

  const listPokemonsUseCase = new ListPokemonsUseCase(listPokemonsService);

  it('should fetch pokemons', async () => {
    expect(listPokemonsUseCase.execute(5)).resolves.toHaveLength(5);
  });
});