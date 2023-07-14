import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default matchesRouter;
