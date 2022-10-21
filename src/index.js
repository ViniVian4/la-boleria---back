import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import cakesRouter from './routers/cakesRouter.js';

dotenv.config({ path: "../.env"} );

const app = express();
app.use(express.json());
app.use(cors());

app.use(cakesRouter);

app.listen(process.env.PORT, () => console.log(`magic happens on ${process.env.PORT}`));