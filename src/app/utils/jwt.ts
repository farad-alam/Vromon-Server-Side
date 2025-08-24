import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";
import { envVars } from "../config/env";

const jwt_secret = envVars.JWT_ACCESS_TOKEN_SECRET;
const expiresIn = envVars.JWT_ACCESS_TOKEN_EXPIRES;

export const genarateToken = (
  payload: Partial<IUser>,
  secret: string = jwt_secret,
  expiresin: string = expiresIn
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expiresin,
  } as SignOptions);

  return token;
};

export const verifyToken = (
  accessToken: string,
  secret: string = jwt_secret
) => {
  const token = jwt.verify(accessToken, secret) as JwtPayload;
  return token
};
