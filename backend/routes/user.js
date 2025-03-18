import express from "express";
import { register, login, singleUser, logout } from "../controllers/user.js";
import { authenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/profile", authenticated, singleUser)

export default router;