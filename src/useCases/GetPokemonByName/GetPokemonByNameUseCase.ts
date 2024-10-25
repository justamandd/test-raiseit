import { GetPokemonByNameDTO } from "./GetPokemonByNameDTO";
import { GetPokemonByNameService } from "@services/GetPokemonByName/GetPokemonByNameService";

export class GetPokemonByNameUseCase {
  constructor(
    private getPokemonByNameService: GetPokemonByNameService,
  ){}

  async execute(name: string): Promise<GetPokemonByNameDTO> {
    
    if (!name) {
      throw new Error('Name is required');
    }

    const pokemon = await this.getPokemonByNameService.getPokemonByName(name);

    return {
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      bmi: pokemon.bmi,
      category: pokemon.category
    } as GetPokemonByNameDTO;
  }
}