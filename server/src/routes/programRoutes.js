// import express from "express";
// import {
//   getPrograms,
//   addProgram, // ← הנה כאן!
//   getProgramDetail,
//   searchPrograms,
//   getTopRatedPrograms,
//   getAnimatedPrograms,
// } from "../controllers/programController.js";

// import protect from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/roleMiddleware.js";

// const router = express.Router();

// // Public routes
// router.get("/", getPrograms);
// router.get("/search", searchPrograms);
// router.get("/top-rated", getTopRatedPrograms);
// router.get("/animated", getAnimatedPrograms);

// // Protected route for program details
// router.get("/:id", protect, getProgramDetail);

// // Admin-only route for creating programs
// router.post("/", protect, isAdmin, addProgram);

// export default router;

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

/* ---------- Public Routes ---------- */

// שליפת כל התוכניות (ניתן לשלוח פרמטרים כמו type, language, category)
router.get("/", getPrograms);

// חיפוש עם פרמטרים: query, type, language, category
router.get("/search", searchPrograms);

// תכנים הכי מדורגים
router.get("/top-rated", getTopRatedPrograms);

// תכנים באנימציה
router.get("/animated", getAnimatedPrograms);

/* ---------- Protected Routes ---------- */

// שליפת תוכנית לפי מזהה (משתמש חייב להיות מחובר)
router.get("/:id", protect, getProgramDetail);

// יצירת תוכנית חדשה – למנהלים בלבד
router.post("/", protect, isAdmin, addProgram);

export default router;
