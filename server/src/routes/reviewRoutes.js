// ✅ routes/reviewRoutes.js
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  addReview,
  getReviewsByProgram,
  getAllReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

router.use(protect);
router.post("/", addReview);
router.get("/", getAllReviews); // 🔥 חדש
router.get("/:id", getReviewsByProgram);

export default router;
