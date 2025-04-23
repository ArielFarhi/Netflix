import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  movieId: { type: Number, required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  isPublic: { type: Boolean, default: true },
  posterPath: { type: String },
  title: { type: String },
});

export default mongoose.model("Review", reviewSchema);
