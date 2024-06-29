import jwt, { SignOptions, Secret } from "jsonwebtoken";

export const signToken = (
  payload: string | object | Buffer,
  secretKey: Secret,
  options?: SignOptions,
) => {
  return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token: string, secretKey: Secret) => {
  return jwt.verify(token, secretKey);
};
