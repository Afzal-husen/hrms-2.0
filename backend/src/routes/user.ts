import express from "express";
import { signUp } from "../controllers/user/sign-up.js";

const router = express();

router.post("/signup", signUp);

export default router;
