import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import cakesRouter from './routers/cakesRouter.js';
import clientsRouter from './routers/clientsRouter.js';
import ordersRouter from './routers/ordersRouter.js';

dotenv.config({ path: "../.env"} );

const app = express();
app.use(express.json());
app.use(cors());

app.use(cakesRouter);
app.use(clientsRouter);
app.use(ordersRouter);

app.listen(process.env.PORT, () => console.log(`magic happens on ${process.env.PORT}`));