import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private matchesService = new MatchesService();

  public async getAllMatches(req:Request, res:Response) {
    const teams = await this.matchesService.getMatches();
    return res.status(200).json(teams);
  }
}
