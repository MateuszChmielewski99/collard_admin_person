import express, { Application, Request, Response } from 'express';
import 'reflect-metadata';
import DistributorRouter from './controllers/DirectorController';
import { bootstrap } from './container-setup';
import ActorRouter from './controllers/ActorController';

bootstrap();

const app: Application = express();

app.use('/director', DistributorRouter);
app.use('/actor',ActorRouter);

//healthcheck
app.get('/', (_req: Request, res: Response) => {
    return res.sendStatus(200);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('App and running'));
