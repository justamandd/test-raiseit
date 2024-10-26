import { Pokemon } from "@entities/Pokemon";
import { IPokemonData } from "@interfaces/entities/IPokemonData";

export interface IPokemonFactory {
  createPokemon(data: IPokemonData): Pokemon;
  createPokemons(dataArray: IPokemonData[]): Pokemon[];
}