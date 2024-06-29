import express from "express";
import { signUp } from "../controllers/user/sign-up.js";
import { login } from "../controllers/user/login.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);

export { userRouter };
