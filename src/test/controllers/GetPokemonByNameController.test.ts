import dotenv from "dotenv";
dotenv.config();

import request from 'supertest';
import express, { Express, Request, Response } from 'express';
import { BmiCalculator } from "@utils/BmiCalculator";
import { GetPokemonByNameService } from "@services/GetPokemonByNameService";
import { GetPokemonByNameUseCase } from "@useCases/GetPokemonByNameUseCase";
import { GetPokemonByNameController } from "@controllers/GetPokemonByNameController";
import { BmiClassifier } from "@utils/BmiClassifier";
import { HeightConverter } from "@utils/HeightConverter";
import { WeightConverter } from "@utils/WeightConverter";

const app: Express = express();
app.use(express.json());

const bmiCalculator = new BmiCalculator();
const bmiClassifier = new BmiClassifier();
const heightConverter = new HeightConverter();
const weightConverter = new WeightConverter();

const getPokemonByNameService = new GetPokemonByNameService(
  process.env.POKEAPI_URL!, 
  process.env.POKEAPI_FIND_ROUTE!, 
  bmiCalculator,
  bmiClassifier,
  weightConverter,
  heightConverter,
);

const getPokemonByNameUseCase = new GetPokemonByNameUseCase(getPokemonByNameService);
const getPokemonByNameController = new GetPokemonByNameController(getPokemonByNameUseCase);

app.get('/pokemons/:name', async (req: Request, res: Response) => await getPokemonByNameController.handle(req, res));

describe('GetPokemonByNameController', () => {
  it('should return a pokemon with status 200', async () => {
    const response = await request(app).get('/pokemons/pikachu');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('height');
    expect(response.body).toHaveProperty('weight');
    expect(response.body).toHaveProperty('bmi');
  })

  it('should return a 400 status when pokemon is not found', async () => {
    const response = await request(app).get('/pokemons/invalid_pokemon');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
})