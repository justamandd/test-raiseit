import { Pokemon } from "@entities/Pokemon";

export interface IListPokemons {
  getPokemons(): Promise<Pokemon[]>;
}