import { Request, Response } from 'express';
import TeamServices from '../services/teamsService';

export default class TeamController {
  constructor(private teamService:any = new TeamServices()) {}
  public async getAll(_req:Request, res:Response) {
    const allTeams = await this.teamService.getAll();
    res.status(200).json(allTeams);
  }

  public async getTeam(req:Request, res:Response) {
    const { id } = req.params;
    const team = await this.teamService.getTeam(id);
    if (team.type) {
      res.status(team.type).json({ message: team.message });
    } else {
      res.status(200).json(team.message);
    }
  }
}
