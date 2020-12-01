import express, { Application } from 'express';
import 'reflect-metadata';
import DistributorRouter from './controllers/DirectorController';
import { bootstrap } from './container-setup';
import ActorRouter from './controllers/ActorController';

bootstrap();

const app: Application = express();

app.use('/director', DistributorRouter);
app.use('/actor',ActorRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('App and running'));
