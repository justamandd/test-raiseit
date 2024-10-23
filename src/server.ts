import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import { routes } from "@routes/pokemon.routes";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}/`));