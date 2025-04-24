import React, { useState } from "react";
import axios from "axios";
import { useUserAuth } from "../context/Authentication.jsx";

const initialForm = {
  title: "",
  type: "Movie",
  overview: "",
  releaseDate: "",
  genres: "",
  backdropUrl: "",
  posterUrl: "",
  rating: "",
  popularity: "",
  originalLanguage: "",
  tmdbId: "",
  tags: "",
  cast: "",
};

const AddProgramForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState(initialForm);
  const { user } = useUserAuth();
  const token = user?.token;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://netflix-szyh.onrender.com/api/programs", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSuccess?.();
      setFormData(initialForm);
    } catch (err) {
      console.error("Failed to add program:", err);
      alert("Failed to add program.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      <div>
        <label className="block mb-1">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <label className="block mb-1">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        >
          <option>Movie</option>
          <option>Tv-show</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className="block mb-1">Overview</label>
        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <label className="block mb-1">Release Date</label>
        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <label className="block mb-1">Genres</label>
        <input
          name="genres"
          value={formData.genres}
          onChange={handleChange}
          placeholder="Comedy, Drama..."
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <label className="block mb-1">Backdrop Image URL</label>
        <input
          name="backdropUrl"
          value={formData.backdropUrl}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <label className="block mb-1">Poster Image URL</label>
        <input
          name="posterUrl"
          value={formData.posterUrl}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <label className="block mb-1">Rating</label>
        <input
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <label className="block mb-1">Popularity</label>
        <input
          name="popularity"
          value={formData.popularity}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <label className="block mb-1">Original Language</label>
        <input
          name="originalLanguage"
          value={formData.originalLanguage}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div>
        <label className="block mb-1">TMDB ID</label>
        <input
          name="tmdbId"
          value={formData.tmdbId}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block mb-1">Tags</label>
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Exciting, Feel-good..."
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block mb-1">Cast</label>
        <input
          name="cast"
          value={formData.cast}
          onChange={handleChange}
          placeholder="Actor 1, Actor 2..."
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
      </div>

      <div className="sm:col-span-2 flex justify-end gap-4 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddProgramForm;