import { Router } from 'express';
import teamRouter from './teams.router';

const router = Router();

router.use('/teams', teamRouter);

export default router;
