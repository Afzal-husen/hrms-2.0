import { Request, Response, NextFunction } from "express";
import { ApiError } from "../lib/errors/api-error.js";
import { verifyToken } from "../lib/utils/sign-verify-token.js";
import { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
  id: string;
  email: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies["user-token"];
    if (!token)
      return next(
        new ApiError({
          code: 401,
          message: "You are not authorized to access this resource",
        }),
      );

    const decodedToken = verifyToken(token, process.env.JWT_SECRET_KEY);
    const { id, email } = decodedToken as UserPayload;

    Object.defineProperties(req, {
      userId: {
        value: id,
        writable: true,
      },
      email: {
        value: email,
        writable: true,
      },
    });

    next();
  } catch (error) {
    next(error);
  }
};
