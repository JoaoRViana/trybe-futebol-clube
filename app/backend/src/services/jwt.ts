import { sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  username: string,
};

function tokensign(payload: TokenPayload): string {
  const token = sign(payload, secret);
  return token;
}

function tokenverify(token: string): TokenPayload {
  const decoded = verify(token, secret) as TokenPayload;
  return decoded;
}

class EmptyObj {
  public _obj = {
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0 };

  get obj() {
    return this._obj;
  }
}
export {
  EmptyObj,
  tokensign,
  tokenverify,
};
