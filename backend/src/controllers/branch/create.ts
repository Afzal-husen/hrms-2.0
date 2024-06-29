import { Request, Response, NextFunction } from "express";
import { create } from "../../lib/db/queries/branch.js";
import { jsonResponse } from "../../lib/utils/json-response.js";
import { ApiError } from "../../lib/errors/api-error.js";

export const createBranch = async (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name }: { name: string } = req.body;

    const userId = req.userId as string;

    if (!name)
      return next(new ApiError({ code: 400, message: "Name is Required" }));

    const branch = await create({ name, user_id: userId });

    return res.status(201).json(
      jsonResponse({
        success: true,
        message: "Branch created successfully",
        data: branch,
      }),
    );
  } catch (error) {
    next(error);
  }
};
