import { Router } from "express";
import { signUpCallback } from "../controller/authController.js";

const router = Router();

router.post("/callback", signUpCallback);
export default router;