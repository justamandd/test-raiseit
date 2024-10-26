import { Request, Response } from "express";
import { GetPokemonByNameUseCase } from "@useCases/GetPokemonByNameUseCase";

export class GetPokemonByNameController {
  constructor(
    private getPokemonByNameUseCase: GetPokemonByNameUseCase
  ){}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;

    try {
      const pokemon = await this.getPokemonByNameUseCase.execute(name as string);

      return res.status(200).json(pokemon);
    } catch (err) {
      const error = err as Error;

      return res.status(400).json({
        message: error.message
      });
    }
  }
}