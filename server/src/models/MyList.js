import mongoose from "mongoose";

const myListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
  posterPath: { type: String },
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" }
}, {
  timestamps: true
});

myListSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("MyList", myListSchema);
