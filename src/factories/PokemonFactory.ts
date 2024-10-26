import { Pokemon } from "@entities/Pokemon";
import { IPokemonData } from "@interfaces/entities/IPokemonData";
import { IPokemonFactory } from "@interfaces/factories/IPokemonFactory";
import { BmiCalculator } from "@utils/BmiCalculator";
import { BmiClassifier } from "@utils/BmiClassifier";
import { HeightConverter } from "@utils/HeightConverter";
import { WeightConverter } from "@utils/WeightConverter";

export class PokemonFactory implements IPokemonFactory {
  constructor(
    private bmiCalculator: BmiCalculator,
    private bmiClassifier: BmiClassifier,
    private weightConverter: WeightConverter,
    private heightConverter: HeightConverter,
  ){}

  createPokemon(data: IPokemonData) {
    return new Pokemon(
      { 
        name: data.name,
        height: data.height,
        weight: data.weight,
        bmiCalculator: this.bmiCalculator,
        bmiClassifier: this.bmiClassifier,
        weightConverter: this.weightConverter,
        heightConverter: this.heightConverter
      }
    )
  }

  createPokemons(dataArray: IPokemonData[]) {
    return dataArray.map((pokemon: IPokemonData) => 
      this.createPokemon({
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight
      })
    );
  }
}