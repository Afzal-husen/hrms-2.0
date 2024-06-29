import express from "express";
import { signUp } from "../controllers/user/sign-up.js";
import { login } from "../controllers/user/login.js";

const router = express();

router.post("/signup", signUp);
router.post("/login", login);

export default router;
