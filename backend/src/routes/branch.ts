import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { createBranch } from "../controllers/branch/create.js";

const branchRouter = express.Router();

branchRouter.post("/create-branch", authenticate, createBranch);

export { branchRouter };
