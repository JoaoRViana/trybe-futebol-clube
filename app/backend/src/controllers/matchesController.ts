import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private matchesService = new MatchesService();

  public async getAllMatches(req:Request, res:Response) {
    const searchTerm = req.query;
    const teams = await this.matchesService.getMatches(searchTerm);
    return res.status(200).json(teams);
  }

  public async setMatch(req:Request, res:Response) {
    const { id } = req.params;
    const { authorization: token } = req.headers;
    const { type, message } = await this.matchesService.setMatch(token, +id);
    return res.status(type).json({ message });
  }

  public async updateMatch(req:Request, res:Response) {
    const { id } = req.params;
    const { authorization: token } = req.headers;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { type, message } = await this.matchesService.updateMatches(
      token,
      +id,
      homeTeamGoals,
      awayTeamGoals,
    );
    return res.status(type).json({ message });
  }
}
