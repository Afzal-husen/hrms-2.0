import { NextFunction, Request } from "express";
import { ApiError } from "../errors/api-error.js";

export const requiredValidation = (
  body: any,
  keys: string[],
  next: NextFunction,
) => {
  for (const key of keys) {
    if (!body[key])
      return next(new ApiError({ code: 400, message: `${key} is required` }));
  }
};
