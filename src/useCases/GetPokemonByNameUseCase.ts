import { GetPokemonByNameDTO } from "@dto/GetPokemonByNameDTO";
import { GetPokemonByNameService } from "@services/GetPokemonByNameService";

export class GetPokemonByNameUseCase {
  constructor(
    private getPokemonByNameService: GetPokemonByNameService,
  ){}

  async execute(name: string): Promise<GetPokemonByNameDTO> {
    
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