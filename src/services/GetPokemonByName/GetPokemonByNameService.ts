import axios, { AxiosResponse } from "axios";
import { Pokemon } from "@entities/Pokemon";
import { IGetPokemonByName } from "./IGetPokemonByName";
import { BmiCalculator } from "@entities/BmiCalculator";


export class GetPokemonByNameService implements IGetPokemonByName {
  constructor(
    private pokeapi_url: string, 
    private pokeapi_find_route: string, 
    private bmiCalculator: BmiCalculator
  ) {}

  async getPokemonByName(name: string): Promise<Pokemon> {
    let url = `${this.pokeapi_url}${this.pokeapi_find_route}${name}`;

    let response;

    try {
      response = await axios(url);
    } catch (err) {
      const error = err as Error;

      throw new Error(error.message);
    }

    if (response.status !== 200 || !response.data) {
      throw new Error('Error fetching Pokemon: ' + name);
    }

    const pokemon = new Pokemon({ 
        name: response.data.name,
        height: response.data.height,
        weight: response.data.weight,
        bmiCalculator: this.bmiCalculator
      }
    );

    return pokemon;
  }
}