import mongoose from 'mongoose';

const movieListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
  posterPath: { type: String },
});

export default mongoose.model('MovieList', movieListSchema);