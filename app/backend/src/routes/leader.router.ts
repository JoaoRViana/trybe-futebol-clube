import { Request, Router, Response } from 'express';
import LeaderController from '../controllers/leaderController';

const Leaderrouter = Router();

const leaderController = new LeaderController();

Leaderrouter.get('/home', (req: Request, res: Response) => leaderController.home(req, res));
Leaderrouter.get('/away', (req: Request, res: Response) => leaderController.away(req, res));

export default Leaderrouter;
