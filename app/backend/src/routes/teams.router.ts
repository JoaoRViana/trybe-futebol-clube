import { Request, Router, Response } from 'express';
import TeamController from '../controllers/teamsController';

const teamRouter = Router();

const teamController = new TeamController();

teamRouter.get('/', (req: Request, res: Response) => teamController.getAll(req, res));
teamRouter.get('/:id', (req: Request, res: Response) => teamController.getTeam(req, res));

export default teamRouter;
