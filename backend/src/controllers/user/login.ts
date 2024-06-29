import { Request, Response, NextFunction } from "express";
import { requiredValidation } from "../../lib/utils/validations.js";
import { findUserWithEmail } from "../../lib/db/queries/user.js";
import { ApiError } from "../../lib/errors/api-error.js";
import { isPasswordMatch } from "../../lib/utils/password-hashing.js";

type LoginType = {
  email: string;
  password: string;
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password }: LoginType = req.body;

    const keys = ["email", "password"];

    requiredValidation(req.body, keys, next);

    const user = await findUserWithEmail(email);

    if (!user)
      return next(
        new ApiError({
          code: 404,
          message: `User with email ${email} does not exist`,
        }),
      );

    if (!isPasswordMatch(password, user.password)) {
      return next(
        new ApiError({
          code: 403,
          message: "Wrong password, please provide a correct password",
        }),
      );
    }
    
  } catch (error) {
    next(error);
  }
};
