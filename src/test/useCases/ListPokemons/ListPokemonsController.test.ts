import dotenv from "dotenv";
dotenv.config();

import request from 'supertest';
import express, { Express, Request, Response } from 'express';

import { BmiCalculator } from "@entities/BmiCalculator";
import { ListPokemonsService } from "@services/ListPokemons/ListPokemonsService";
import { ListPokemonsController } from "@useCases/ListPokemons/ListPokemonsController";
import { ListPokemonsUseCase } from "@useCases/ListPokemons/ListPokemonsUseCase";

const app: Express = express();
app.use(express.json());

const bmiCalculator = new BmiCalculator();

const listPokemonsService = new ListPokemonsService(
  process.env.POKEAPI_URL!, 
  process.env.POKEAPI_LIST_ROUTE!, 
  bmiCalculator
);
const listPokemonsUseCase = new ListPokemonsUseCase(listPokemonsService);
const listPokemonsController = new ListPokemonsController(listPokemonsUseCase);

app.get('/pokemon', async (req: Request, res: Response) => await listPokemonsController.handle(req, res));

describe('ListPokemonsController', () => {
  it('should return a list of pokemons with status 200', async () => {
    const response = await request(app).get('/pokemon?limit=20');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(20);
  })
})