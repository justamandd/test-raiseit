import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import { routes } from "@routes/index";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load('pokemons_api_doc.yaml');

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`Server is running on http://localhost:${port}/`));