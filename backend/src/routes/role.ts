import express from "express";
import { createRole } from "../controllers/role/create.js";
import { authenticate } from "../middlewares/auth.js";

const roleRouter = express.Router();

roleRouter.post("/create-role", authenticate, createRole);

export { roleRouter };
