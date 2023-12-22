import express from "express";
const router = express.Router();
import userCtrl from "../controllers/auth.controller.js";

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);

export default router;
