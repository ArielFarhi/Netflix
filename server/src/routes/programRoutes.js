import express from "express";
import {
  getPrograms,
  addProgram, // ← הנה כאן!
  getProgramDetail,
  searchPrograms,
  getTopRatedPrograms,
  getAnimatedPrograms,
} from "../controllers/programController.js";

import protect from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getPrograms);
router.get("/search", searchPrograms);
router.get("/top-rated", getTopRatedPrograms);
router.get("/animated", getAnimatedPrograms);

// Protected route for program details
router.get("/:id", protect, getProgramDetail);

// Admin-only route for creating programs
router.post("/", protect, isAdmin, addProgram);

export default router;
