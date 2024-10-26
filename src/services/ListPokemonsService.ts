import axios, { AxiosError } from "axios";
import { IListPokemons } from "@interfaces/services/IListPokemons";
import { Pokemon } from "@entities/Pokemon";
import { PokemonFactory } from "@factories/PokemonFactory";

export class ListPokemonsService implements IListPokemons {
  constructor(
    private pokeapi_url: string, 
    private pokeapi_list_route: string, 
    private pokemonFactory: PokemonFactory
  ) {}

  async getPokemons(limit?: number): Promise<Pokemon[]> {
    let url = `${this.pokeapi_url}${this.pokeapi_list_route}`;

    if (limit) {
      url = `${url}?limit=${limit}&offset=0`;
    }

    let response;

    try {
      response = await axios(url);
    } catch (err) {
      const error = err as AxiosError;

      throw new Error(error.message);
    }

    if (response.status !== 200 || !response.data.results) {
      throw new Error('Error fetching');
    }
    
    const pokemonUrlList = response.data.results;

    const pokemonsDetails = await Promise.all(pokemonUrlList.map(async (pokemon: any) => {
      const pokemonData = await axios(pokemon.url);
      return pokemonData.data;
    }));

    return this.pokemonFactory.createPokemons(pokemonsDetails);
  }
}