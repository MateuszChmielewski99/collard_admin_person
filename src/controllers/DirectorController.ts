import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { DirectorService } from '../services/DirecotorService';
import express, { Router } from 'express';

const DistributorRouter: Router = express.Router();

const searchDistributor = async (req: Request, res: Response) => {
  const service: DirectorService = container.resolve(DirectorService);

  const queryString = req.query.query as string;

  if (!queryString) {
    return res.status(400).send('Query cannot be empty');
  }
  
  const result = await service.search(queryString);

  res.json(result);
};

DistributorRouter.get('/search', searchDistributor);

export default DistributorRouter;
