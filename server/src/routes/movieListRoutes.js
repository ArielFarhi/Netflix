import express from 'express';
import { addMovie, getMyList } from '../controllers/movieListController.js';

const router = express.Router();

router.post('/', addMovie);
router.get('/:userId', getMyList);

export default router;