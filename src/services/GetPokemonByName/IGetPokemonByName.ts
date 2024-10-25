import { Pokemon } from "@entities/Pokemon";

export interface IGetPokemonByName {
  getPokemonByName(name: string): Promise<Pokemon>;
}