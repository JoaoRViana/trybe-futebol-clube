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

  public async postMatch(req:Request, res:Response) {
    const { authorization: token } = req.headers;
    const match = req.body;
    if (+match.awayTeamId === +match.homeTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    const { type, message } = await this.matchesService.postMatch(
      token,
      match,
    );
    if (type >= 300) {
      return res.status(type).json({ message });
    }
    return res.status(type).json(message);
  }
}
