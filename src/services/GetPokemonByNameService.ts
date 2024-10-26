import axios, { AxiosError } from "axios";
import { Pokemon } from "@entities/Pokemon";
import { IGetPokemonByName } from "../interfaces/services/IGetPokemonByName";
import { PokemonFactory } from "@factories/PokemonFactory";


export class GetPokemonByNameService implements IGetPokemonByName {
  constructor(
    private pokeapi_url: string, 
    private pokeapi_find_route: string, 
    private pokemonFactory: PokemonFactory
  ) {}

  async getPokemonByName(name: string): Promise<Pokemon> {
    let url = `${this.pokeapi_url}${this.pokeapi_find_route}${name}`;

    let response;

    try {
      response = await axios(url);
    } catch (err) {
      const error = err as AxiosError;

      if(error.status == 404){
        throw new Error('Pokemon not found: ' + name);
      }
      
      throw new Error(error.message);
    }

    if (response.status !== 200 || !response.data) {
      throw new Error('Error fetching Pokemon: ' + name);
    }

    return this.pokemonFactory.createPokemon({
      name: response.data.name,
      height: response.data.height,
      weight: response.data.weight,
    });
  }
}