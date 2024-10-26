import dotenv from "dotenv";
dotenv.config();

import request from 'supertest';
import express, { Express, Request, Response } from 'express';

import { BmiCalculator } from "@utils/BmiCalculator";
import { ListPokemonsService } from "@services/ListPokemonsService";
import { ListPokemonsController } from "@controllers/ListPokemonsController";
import { ListPokemonsUseCase } from "@useCases/ListPokemonsUseCase";
import { BmiClassifier } from "@utils/BmiClassifier";
import { HeightConverter } from "@utils/HeightConverter";
import { WeightConverter } from "@utils/WeightConverter";

const app: Express = express();
app.use(express.json());

const bmiCalculator = new BmiCalculator();
const bmiClassifier = new BmiClassifier();
const heightConverter = new HeightConverter();
const weightConverter = new WeightConverter();

const listPokemonsService = new ListPokemonsService(
  process.env.POKEAPI_URL!, 
  process.env.POKEAPI_LIST_ROUTE!, 
  bmiCalculator,
  bmiClassifier,
  weightConverter,
  heightConverter,
);
const listPokemonsUseCase = new ListPokemonsUseCase(listPokemonsService);
const listPokemonsController = new ListPokemonsController(listPokemonsUseCase);

app.get('/pokemons', async (req: Request, res: Response) => await listPokemonsController.handle(req, res));

describe('ListPokemonsController', () => {
  it('should return a list of pokemons with status 200', async () => {
    const response = await request(app).get('/pokemons?limit=20');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(20);
  })
})