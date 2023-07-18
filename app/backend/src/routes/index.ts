import { Router } from 'express';
import teamRouter from './teams.router';
import loginRouter from './login.router';
import matchesRouter from './matches.router';
import Leaderrouter from './leader.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', Leaderrouter);

export default router;
