import { Request, Response } from "express";
import { ListPokemonsUseCase } from "@useCases/ListPokemonsUseCase";

export class ListPokemonsController {
  constructor(private listPokemonsUseCase: ListPokemonsUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { limit } = req.query;

    try {
      let pokemons;

      if (limit) {
        pokemons = await this.listPokemonsUseCase.execute(parseInt(limit as string));
      } else {
        pokemons = await this.listPokemonsUseCase.execute();
      }

      return res.status(200).json(pokemons);
    } catch (err) {
      const error = err as Error;

      return res.status(400).json({
        message: error.message
      });
    }
  }
}