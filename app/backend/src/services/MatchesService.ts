import Matches from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class MatchesService {
  private matchesModel = Matches;
  private teamsModel = TeamsModel;
  public async getMatches():Promise<any> {
    const matches = await this.matchesModel.findAll();
    const result = await Promise.all(matches.map(async (e) => {
      const homeTeam = await this.teamsModel.findOne({ where: { id: e.homeTeamId } });
      const awayTeam = await this.teamsModel.findOne({ where: { id: e.awayTeamId } });
      const match = { ...e.dataValues,
        homeTeam: { teamName: homeTeam?.teamName },
        awayTeam: { teamName: awayTeam?.teamName } };
      return match;
    }));
    return result;
  }
}
