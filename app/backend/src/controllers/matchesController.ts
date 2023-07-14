import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private matchesService = new MatchesService();

  public async getAllMatches(req:Request, res:Response) {
    const searchTerm = req.query;
    const teams = await this.matchesService.getMatches(searchTerm);
    return res.status(200).json(teams);
  }
}
