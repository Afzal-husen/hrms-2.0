import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../lib/errors/api-error.js";
import { UserData } from "../../lib/types/user.js";
import { create, findUserWithEmail } from "../../lib/db/queries/user.js";
import { hashPassword } from "../../lib/utils/password-hashing.js";
import { jsonResponse } from "../../lib/utils/json-response.js";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, mobile, address }: UserData = req.body;

    if (!email)
      return next(new ApiError({ code: 400, message: "Email is Required" }));
    if (!password)
      return next(new ApiError({ code: 400, message: "Password is Required" }));
    if (!name)
      return next(new ApiError({ code: 400, message: "Name is Required" }));
    if (!mobile)
      return next(new ApiError({ code: 400, message: "Mobile is Required" }));
    if (!address)
      return next(new ApiError({ code: 400, message: "Addres is Required" }));

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

    await create({
      name,
      email,
      address,
      mobile,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json(
        jsonResponse({ success: true, message: "Registration successfull" }),
      );
  } catch (error) {
    next(error);
  }
};
