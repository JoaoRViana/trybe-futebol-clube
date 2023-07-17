import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.patch('/:id/finish', (req:Request, res:Response) =>
  matchesController.setMatch(req, res));
matchesRouter.patch('/:id', (req:Request, res:Response) => matchesController.updateMatch(req, res));
matchesRouter.post('/', (req:Request, res:Response) => matchesController.postMatch(req, res));
matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default matchesRouter;
