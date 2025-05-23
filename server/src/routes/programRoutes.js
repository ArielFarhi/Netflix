import express from "express";
import {
  getPrograms,
  addProgram,
  getProgramDetail,
  searchPrograms,
  getTopRatedPrograms,
  getAnimatedPrograms,
} from "../controllers/programController.js";

import protect from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", getPrograms);
router.get("/search", searchPrograms);
router.get("/top-rated", getTopRatedPrograms);
router.get("/animated", getAnimatedPrograms);
router.get("/:id", protect, getProgramDetail);
router.post("/", protect, isAdmin, addProgram);

export default router;
