import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  rating: { type: Number, default: 0 },
  releaseDate: { type: Date },
  type: { type: String, enum: ["movie", "tv-show"] },
  episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],
});

export default mongoose.model("Program", programSchema);
