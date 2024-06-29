import { Request, Response, NextFunction } from "express";
import { findUserWithEmail } from "../../lib/db/queries/user.js";
import { ApiError } from "../../lib/errors/api-error.js";
import { isPasswordMatch } from "../../lib/utils/password-hashing.js";
import { signToken } from "../../lib/utils/sign-verify-token.js";

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

    if (!email)
      return next(new ApiError({ code: 400, message: "Email is Required" }));
    if (!password)
      return next(new ApiError({ code: 400, message: "Password is Required" }));

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

    const token = signToken(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    return res
      .cookie("user-token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .json({ success: true, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};
