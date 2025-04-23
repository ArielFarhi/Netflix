import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router";
import { useAddReview, useGetReviews } from "../api/reviewData";
import { FormLabel } from "../components/ui/FormLabel";
import { TextFieldArea } from "../components/ui/TextFieldArea";
import { FormCheckbox } from "../components/ui/FormCheckbox";
import { Button } from "../components/ui/Button";
import LoadingScreen from "../components/ui/LoadingScreen";
import Navbar from "../components/Navbar";
import { Star, X } from "lucide-react";

const Review = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const posterPath = queryParams.get("posterPath");
  const title = queryParams.get("title");

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const { mutate: addReview, isLoading: isAddingReview } = useAddReview();
  const { data: reviews = [], isLoading: isLoadingReviews, error: reviewsError } = useGetReviews(movieId);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({ movieId, rating, posterPath, title, comment, isPublic });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0d0d0d] to-black text-white">
      <Navbar />

      <div className="mx-auto max-w-2xl py-12 px-6">
        <div className="relative bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-lg p-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            aria-label="Close review form"
          >
            <X className="w-6 h-6" />
          </button>

          <h1 className="text-3xl font-bold mb-6 text-center">Write a Review</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <FormLabel className="text-gray-300 mb-1 block">Rating:</FormLabel>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-7 h-7 cursor-pointer transition-transform duration-150 ${
                      rating >= star ? "text-yellow-400 scale-110" : "text-gray-600"
                    } hover:scale-125`}
                    onClick={() => setRating(star)}
                    fill={rating >= star ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>

            <div>
              <FormLabel htmlFor="comment" className="text-gray-300 mb-1 block">Comment:</FormLabel>
              <TextFieldArea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                className="bg-[#2a2a2a] text-white border border-gray-600"
                placeholder="Write your review here..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <FormCheckbox
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
                className="border-gray-600"
              />
              <FormLabel className="text-gray-300">Make this review public</FormLabel>
            </div>

            <Button
              type="submit"
              disabled={isAddingReview}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all rounded-xl"
            >
              {isAddingReview ? <LoadingScreen size="sm" /> : "Submit Review"}
            </Button>
          </form>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold mb-5 text-white border-b border-gray-700 pb-2">Reviews</h2>
          {isLoadingReviews ? (
            <LoadingScreen />
          ) : reviewsError ? (
            <p className="text-red-500">Failed to load reviews. Please try again later.</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet.</p>
          ) : (
            <div className="space-y-5">
              {reviews.map((review) => (
                <div key={review._id} className="bg-[#222] rounded-xl p-5 border border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-white">
                      {review.userId?.email || "Anonymous"}
                    </p>
                    <p className="text-yellow-400">{`⭐ ${review.rating}/5`}</p>
                  </div>
                  <p className="text-gray-300 mt-1">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {review.isPublic ? "Public" : "Private"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;