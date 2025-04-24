import express from "express";
import { addMovie, getMyList, removeMovie } from "../controllers/myListController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getMyList);
router.post("/", addMovie);
router.delete("/:movieId", removeMovie);

export default router;
