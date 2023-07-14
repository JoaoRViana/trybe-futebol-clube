import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private loginService:any = new LoginService()) { }
  public async login(req:Request, res:Response) {
    const user = req.body;
    const { type, message } = await this.loginService.validateUser(user);
    if (type) {
      return res.status(type).json({ message });
    }
    return res.status(200).json({ token: message });
  }
}
