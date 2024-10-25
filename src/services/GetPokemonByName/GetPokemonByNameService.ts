import axios, { AxiosError } from "axios";
import { Pokemon } from "@entities/Pokemon";
import { IGetPokemonByName } from "./IGetPokemonByName";
import { BmiCalculator } from "@entities/BmiCalculator";
import { BmiClassifier } from "@entities/BmiClassifier";
import { WeightConverter } from "@entities/WeightConverter";
import { HeightConverter } from "@entities/HeightConverter";


export class GetPokemonByNameService implements IGetPokemonByName {
  constructor(
    private pokeapi_url: string, 
    private pokeapi_find_route: string, 
    private bmiCalculator: BmiCalculator,
    private bmiClassifier: BmiClassifier,
    private weightConverter: WeightConverter,
    private heightConverter: HeightConverter
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

    const pokemon = new Pokemon({ 
        name: response.data.name,
        height: response.data.height,
        weight: response.data.weight,
        bmiCalculator: this.bmiCalculator,
        bmiClassifier: this.bmiClassifier,
        weightConverter: this.weightConverter,
        heightConverter: this.heightConverter
      }
    );

    return pokemon;
  }
}