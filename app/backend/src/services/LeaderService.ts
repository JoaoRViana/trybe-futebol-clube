import { Op } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { EmptyObj } from './jwt';

const aux = (match:any, mainTeam:string, enemyTeam:string) => {
  let vic = null;
  const result = new EmptyObj();
  if (+match[`${mainTeam}Goals`] > +match[`${enemyTeam}Goals`]) {
    result._obj.totalPoints = 3;
    result._obj.totalVictories = 1;
    vic = true;
  } if (+match[`${mainTeam}Goals`] < +match[`${enemyTeam}Goals`]) {
    result._obj.totalLosses = 1;
    vic = false;
  } if (vic === null) {
    result._obj.totalPoints = 1;
    result._obj.totalDraws = 1;
  }
  result._obj.goalsOwn = +match[`${enemyTeam}Goals`];
  result._obj.goalsFavor = +match[`${mainTeam}Goals`];
  return result._obj;
};
export default class LeaderService {
  private matchesModel = Matches;
  private teamsModel = TeamsModel;

  public async getScores(mainTeam:string, enemyTeam:string) {
    const allTeams = await this.teamsModel.findAll();
    const scores = Promise.all(allTeams.map(async (e) => {
      const matches = await this.matchesModel.findAll(
        { where: { [`${mainTeam}Id`]: e.dataValues.id, inProgress: false } },
      );
      const array = matches.map((f) => aux(f.dataValues, mainTeam, enemyTeam));
      const result = LeaderService.getResults(array, e.dataValues.teamName);
      result.goalsBalance = (result.goalsFavor - result.goalsOwn);
      result.efficiency = ((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2);
      return result;
    }));
    const sortedTeams = LeaderService.sortedTeams(await scores);
    return sortedTeams;
  }

  public async getFullScore() {
    const allTeams = await this.teamsModel.findAll();
    const scores = Promise.all(allTeams.map(async (e) => {
      const matches = await this.matchesModel.findAll({
        where: { [Op.or]: [
          { homeTeamId: e.dataValues.id, inProgress: false },
          { awayTeamId: e.dataValues.id, inProgress: false }],
        },
      });
      const array = matches.map((f) => (+f.dataValues.homeTeamId === +e.dataValues.id
        ? aux(f.dataValues, 'homeTeam', 'awayTeam') : aux(f.dataValues, 'awayTeam', 'homeTeam')));
      const result = LeaderService.getResults(array, e.dataValues.teamName);
      result.goalsBalance = (result.goalsFavor - result.goalsOwn);
      result.efficiency = ((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2);
      return result;
    }));
    const sortedTeams = LeaderService.sortedTeams(await scores);
    return sortedTeams;
  }

  public static getResults(array:any, teamName:string):any {
    const finalresult = array.reduce((acc:any, curr:any) => ({
      name: teamName,
      totalPoints: +acc.totalPoints + +curr.totalPoints,
      totalGames: array.length,
      totalVictories: +acc.totalVictories + +curr.totalVictories,
      totalDraws: +acc.totalDraws + +curr.totalDraws,
      totalLosses: +acc.totalLosses + +curr.totalLosses,
      goalsFavor: +acc.goalsFavor + +curr.goalsFavor,
      goalsOwn: +acc.goalsOwn + +curr.goalsOwn }));
    return finalresult;
  }

  public static sortedTeams(array:any) {
    const sorted = array.sort((a:any, b:any) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            return (b.goalsFavor - a.goalsFavor);
          }
          return (+b.goalsBalance - +a.goalsBalance);
        }
        return (b.totalVictories - a.totalVictories);
      }
      return (b.totalPoints - a.totalPoints);
    });
    return sorted;
  }
}
