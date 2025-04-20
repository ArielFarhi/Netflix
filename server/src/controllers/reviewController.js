import reviewService from "../services/reviewService.js";

export const addReview = async (req, res, next) => {
  const userId = req.user._id;
  const reviewPayload = req.body;

  try {
    const createdReview = await reviewService.addReview(reviewPayload, userId);
    res.status(201).json(createdReview);
  } catch (error) {
    next(error);
  }
};

export const getReviewsByProgram = async (req, res, next) => {
  const programId = req.params.id;

  try {
    const programReviews = await reviewService.getReviewsByProgram(programId);
    res.status(200).json(programReviews);
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};