import express from "express";
import { create } from "../controllers/script.js";
import { authenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create", authenticated, create)

export default router;