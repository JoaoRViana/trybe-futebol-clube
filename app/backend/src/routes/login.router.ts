import { Request, Router, Response } from 'express';
import LoginController from '../controllers/loginController';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', (req: Request, res: Response) => loginController.login(req, res));
loginRouter.get('/role', (req: Request, res: Response) => loginController.getRole(req, res));

export default loginRouter;
