import { Response, Request } from 'express';
import { container } from 'tsyringe';
import express, { Router } from 'express';
import { ActorService } from '../services/ActorService';

const ActorRouter: Router = express.Router();

const searchActor = async (req: Request, res: Response) => {
  const service: ActorService = container.resolve(ActorService);

  const queryString = req.query.query as string;

  if (!queryString) {
    return res.status(400).send('Query cannot be empty');
  }
  
  const result = await service.search(queryString);

  res.json(result);
};

ActorRouter.get('/search', searchActor);

export default ActorRouter;
