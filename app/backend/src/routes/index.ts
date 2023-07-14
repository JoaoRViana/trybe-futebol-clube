import { Router } from 'express';
import teamRouter from './teams.router';
import loginRouter from './login.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);

export default router;
