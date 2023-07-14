import { compareSync } from 'bcryptjs';
import { tokensign } from './jwt';
import UserModel from '../database/models/UsersModel';

const invalid = 'Invalid email or password';

export default class LoginService {
  private usermodel = UserModel;

  public async validateUser(user:any) {
    if (!user.email || !user.password) {
      return { type: 400, message: 'All fields must be filled' };
    }
    const re = /\S+@\S+\.\S+/;
    if (!re.test(user.email) || user.password.length < 6) {
      return { type: 401, message: invalid };
    }
    const { type, message } = await this.validatePassword(user.email, user.password);

    return { type, message };
  }

  public async validatePassword(email:string, password:string):Promise<any> {
    const valUser = await this.usermodel.findOne({ where: { email } });
    if (!valUser) {
      return { type: 401, message: invalid };
    }
    if (!compareSync(password, valUser.password)) {
      return { type: 401, message: invalid };
    }
    const payload = { id: valUser.id, username: valUser.userName };
    const token = tokensign(payload);
    return { type: null, message: token };
  }
}
