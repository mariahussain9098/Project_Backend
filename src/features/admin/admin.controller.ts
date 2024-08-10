import { Router } from "express";
import { loginAdmin, registerAdmin } from "../auth/auth.service";

const router = Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

export const AdminRouter = router;
