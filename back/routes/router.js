import express from "express";
const router = express.Router();
import authRoutes from "../routes/user.route.js";

router.use("/auth", authRoutes);

export default router;
