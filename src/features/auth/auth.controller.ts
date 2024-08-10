import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  refreshToken,
  registerUser,
  resetPassword,
} from "./auth.service";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export const AuthRouter = router;
