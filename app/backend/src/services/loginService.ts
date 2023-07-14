import { compareSync } from 'bcryptjs';
import { tokensign } from './jwt';
import UserModel from '../database/models/UsersModel';

const invalid = 'All fields must be filled';

export default class LoginService {
  private usermodel = UserModel;

  public async validateUser(user:any) {
    if (!user.email || !user.password) {
      return { type: 400, message: invalid };
    }
    const { type, message } = await this.validatePassword(user.email, user.password);

    return { type, message };
  }

  public async validatePassword(email:string, password:string):Promise<any> {
    const valUser = await this.usermodel.findOne({ where: { email } });
    if (!valUser) {
      return { type: 400, message: invalid };
    }
    if (!compareSync(password, valUser.password)) {
      return { type: 400, message: invalid };
    }
    const payload = { id: valUser.id, username: valUser.userName };
    const token = tokensign(payload);
    return { type: null, message: token };
  }
}
