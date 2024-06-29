import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../lib/errors/api-error.js";
import { UserData } from "../../lib/types/user.js";
import { createUser, findUserWithEmail } from "../../lib/db/queries/user.js";
import { hashPassword } from "../../lib/utils/password-hashing.js";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, mobile, address }: UserData = req.body;

    const keys = ["name", "email", "password", "mobile", "address"];

    for (const key of keys) {
      if (!req.body[key])
        return next(new ApiError({ code: 400, message: `${key} is required` }));
    }

    const userExists = await findUserWithEmail(email);

    if (userExists) {
      return next(
        new ApiError({
          code: 400,
          message: "User already exist, please try a different email",
        }),
      );
    }

    const hashedPassword = hashPassword(password);

    await createUser({
      name,
      email,
      address,
      mobile,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ success: true, message: "User successfully registered" });
  } catch (error) {
    next(error);
  }
};
