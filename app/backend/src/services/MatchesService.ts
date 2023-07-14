import Matches from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

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
}
