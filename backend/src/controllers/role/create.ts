import { Request, Response, NextFunction } from "express";
import { hashPassword } from "../../lib/utils/password-hashing.js";
import { create } from "../../lib/db/queries/role.js";
import { jsonResponse } from "../../lib/utils/json-response.js";
import { ApiError } from "../../lib/errors/api-error.js";

export const createRole = async (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, permissions, password } = req.body;

    const userId = req.userId as string;

    if (!name)
      return next(new ApiError({ code: 400, message: "Name is required" }));
    if (!email)
      return next(new ApiError({ code: 400, message: "Email is required" }));
    if (!permissions)
      return next(
        new ApiError({ code: 400, message: "Permissions is required" }),
      );
    if (!password)
      return next(new ApiError({ code: 400, message: "Password is required" }));

    const hashedPassword = hashPassword(password);

    const role = await create({
      name,
      email,
      password: hashedPassword,
      user_id: userId,
      permissions,
    });

    return res.status(201).json(
      jsonResponse({
        success: true,
        message: "Role successfully created",
        data: role,
      }),
    );
  } catch (error) {
    next(error);
  }
};
