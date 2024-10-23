import { ListPokemonsService } from "@services/ListPokemons/ListPokemonsService";
import { ListPokemonsDTO } from "@useCases/ListPokemons/ListPokemonsDTO";

export class ListPokemonsUseCase {
  
  constructor(
    private listPokemonsService: ListPokemonsService,
  ) {}

  async execute(limit?: number): Promise<ListPokemonsDTO[]> {
    let pokemons;
    
    if (limit) {
      pokemons = await this.listPokemonsService.getPokemons(limit);
    } else {
      pokemons = await this.listPokemonsService.getPokemons();
    }

    const pokemonsDTO = pokemons.map(pokemon => {
      return {
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        bmi: pokemon.bmi,
        category: pokemon.category
      } as ListPokemonsDTO
    })

    return pokemonsDTO;
  }
}