import { Request, Response } from 'express';
import LeaderService from '../services/LeaderService';

export default class LeaderController {
  constructor(private leaderServices:any = new LeaderService()) { }
  public async home(req:Request, res:Response) {
    const message = await this.leaderServices.getScores('homeTeam', 'awayTeam');
    return res.status(200).json(message);
  }

  public async away(req:Request, res:Response) {
    const message = await this.leaderServices.getScores('awayTeam', 'homeTeam');
    return res.status(200).json(message);
  }
}
