import axios, { AxiosError } from "axios";
import { IListPokemons } from "@services/ListPokemons/IListPokemons";
import { BmiCalculator } from "@entities/BmiCalculator";
import { Pokemon } from "@entities/Pokemon";
import { BmiClassifier } from "@entities/BmiClassifier";
import { WeightConverter } from "@entities/WeightConverter";
import { HeightConverter } from "@entities/HeightConverter";

export class ListPokemonsService implements IListPokemons {
  constructor(
    private pokeapi_url: string, 
    private pokeapi_list_route: string, 
    private bmiCalculator: BmiCalculator,
    private bmiClassifier: BmiClassifier,
    private weightConverter: WeightConverter,
    private heightConverter: HeightConverter
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

    const pokemons = pokemonsDetails.map((pokemon: any) => {
      return new Pokemon({ 
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          bmiCalculator: this.bmiCalculator,
          bmiClassifier: this.bmiClassifier,
          weightConverter: this.weightConverter,
          heightConverter: this.heightConverter
        }
      ) ;
    });

    return pokemons;
  }
}