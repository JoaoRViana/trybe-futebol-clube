import Matches from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { tokenverify } from './jwt';

const tokennotFound = 'Token not found';
const tokeninvalid = 'Token must be a valid token';

export default class MatchesService {
  private matchesModel = Matches;
  private teamsModel = TeamsModel;
  public async getMatches(searchTerm:any):Promise<any> {
    const matches = await this.matchesModel.findAll();
    let filtred = matches;
    if (searchTerm.inProgress) {
      const filt = searchTerm.inProgress === 'true';
      filtred = matches.filter((e) => (e.dataValues.inProgress === filt));
    }
    const result = await this.getAwayHomeTeams(filtred);
    return result;
  }

  public async getAwayHomeTeams(matches:any):Promise<any> {
    const result = await Promise.all(matches.map(async (e:any) => {
      const homeTeam = await this.teamsModel.findOne({ where: { id: e.homeTeamId } });
      const awayTeam = await this.teamsModel.findOne({ where: { id: e.awayTeamId } });
      const match = { ...e.dataValues,
        homeTeam: { teamName: homeTeam?.teamName },
        awayTeam: { teamName: awayTeam?.teamName } };
      return match;
    }));
    return result;
  }

  public async setMatch(token:string | undefined, id:number):Promise<any> {
    if (!token) {
      return { type: 401, message: tokennotFound };
    }
    try {
      const notBearer = token.split(' ');
      tokenverify(notBearer[1]);
      const result = await this.matchesModel.findByPk(id);
      result?.set({ inProgress: false });
      await result?.save();
      return { type: 200, message: 'Finished' };
    } catch (error) {
      return { type: 401, message: tokeninvalid };
    }
  }

  public async updateMatches(
    token:string | undefined,
    id:number,
    homeTeamGoals:number,
    awayTeamGoals:number,
  ):Promise<any> {
    if (!token) {
      return { type: 401, message: tokennotFound };
    }
    try {
      const notBearer = token.split(' ');
      tokenverify(notBearer[1]);
      const result = await this.matchesModel.findByPk(id);
      result?.set({ homeTeamGoals, awayTeamGoals });
      await result?.save();
      return { type: 200, message: 'Finished' };
    } catch (error) {
      return { type: 401, message: tokeninvalid };
    }
  }

  public async getTeams(homeTeamId:number, awayTeamId:number):Promise<any> {
    const homeTeam = await this.teamsModel.findByPk(homeTeamId);
    const awayTeam = await this.teamsModel.findByPk(awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { type: 404, message: 'There is no team with such id!' };
    }
    return { type: null };
  }

  public async postMatch(token:string | undefined, match:any):Promise<any> {
    if (!token) {
      return { type: 401, message: tokennotFound };
    }
    try {
      tokenverify(token.split(' ')[1]);
      const { type, message } = await this.getTeams(+match.homeTeamId, match.awayTeamId);
      if (type) {
        return { type, message };
      }
      const created = await this.matchesModel.create({ awayTeamGoals: match.awayTeamGoals,
        awayTeamId: match.awayTeamId,
        homeTeamGoals: match.homeTeamGoals,
        homeTeamId: match.homeTeamId,
        inProgress: true });
      return { type: 201, message: created };
    } catch (error) {
      return { type: 401, message: tokeninvalid };
    }
  }
}
