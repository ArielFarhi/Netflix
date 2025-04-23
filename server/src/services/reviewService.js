import Review from "../models/Review.js";

const addReview = async (data, userId) => {
  const review = new Review({
    userId,
    programId: data.programId,
    movieId: data.movieId,
    rating: data.rating,
    comment: data.comment,
    isPublic: data.isPublic, 
    posterPath: data.posterPath,
    title: data.title,
  });
  return await review.save();
};

const getReviewsByProgram = async (programId) => {
  const filter = { programId };
  const projection = "email";
  return await Review.find(filter).populate("userId", projection);
};

const getAllReviews = async () => {
  return await Review.find().populate("userId", "email");
};

export default {
  addReview,
  getReviewsByProgram,
  getAllReviews,
};