import jwt, { SignOptions, Secret } from "jsonwebtoken";

export const signToken = (
  payload: string | object | Buffer,
  secretKey: Secret,
  options?: SignOptions,
) => {
  return jwt.sign(payload, secretKey, options);
};
