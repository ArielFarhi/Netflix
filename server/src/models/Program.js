import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["movie", "tv"] },
  description: { type: String },
  releaseDate: { type: Date },
  genre: { type: String },
  rating: { type: Number, default: 0 },
  popularity: { type: Number },
  originalLanguage: { type: String },
  tmdbId: { type: String },
  tags: [{ type: String }],
  cast: [{ type: String }],
  backdropUrl: { type: String },
  posterUrl: { type: String },

  subtitleLanguages: [{ type: String }],
  dubbingLanguages: [{ type: String }],
  episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],
});

export default mongoose.model("Program", programSchema);
