import { Request, Response, NextFunction } from "express";
import prisma from "../../lib/prisma-client.js";
import { ApiError } from "../../lib/errors/api-error.js";

type User = {
  readonly id: string;
  name: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, mobile, address }: User = req.body;

    const userExists = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return next(
        new ApiError({
          code: 400,
          message: "User already exist, please try a different email",
        }),
      );
    }

    prisma.users.create({
      data: {
        name,
        email,
        password,
        mobile,
        address,
      },
    });
  } catch (error) {
    next(error);
  }
};
