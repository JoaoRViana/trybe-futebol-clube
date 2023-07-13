import TeamsModel from '../database/models/TeamsModel';

export default class TeamServices {
  private teamModel = TeamsModel;
  public async getAll():Promise<any> {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  public async getTeam(id:number):Promise<any> {
    const team = await this.teamModel.findByPk(id);
    if (!team) {
      return { type: 404, message: 'Not Found' };
    }
    return { type: null, message: team };
  }
}
