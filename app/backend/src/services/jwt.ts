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

export {
  tokensign,
  tokenverify,
};
