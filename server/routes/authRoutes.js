import { Router } from "express";
import { auth } from "../middleware/auth.js";
import * as authController from "../controllers/authController.js";

const router = Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", auth, authController.me);

export default router;
