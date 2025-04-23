import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import { useAddReview, useGetReviews } from "../api/reviewData";
import { FormLabel } from "../components/ui/FormLabel";
import { TextFieldInput } from "../components/ui/TextFieldInput"
import { TextFieldArea } from "../components/ui/TextFieldArea"; 
import { FormCheckbox } from "../components/ui/FormCheckbox"
import { Button } from "../components/ui/Button"; //
import LoadingScreen from "../components/ui/LoadingScreen";
import Navbar from "../components/Navbar";

const Review = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const posterPath = new URLSearchParams(location.search).get("posterPath");

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const { mutate: addReview, isLoading: isAddingReview } = useAddReview();
  const { data: reviews = [], isLoading: isLoadingReviews, error: reviewsError } = useGetReviews(movieId);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({ movieId, rating, posterPath, comment, isPublic });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="relative z-10">
        <Navbar />
      </div>
      <div className="mx-auto max-w-[600px] py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Write a Review</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <FormLabel htmlFor="rating" className="text-gray-300">Rating (1-5):</FormLabel>
            <TextFieldInput
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(Math.min(5, Math.max(1, parseInt(e.target.value) || 1)))}
              min="1"
              max="5"
              className="mt-2 bg-[#1c1c1c] text-white border border-gray-700"
            />
          </div>

          <div>
            <FormLabel htmlFor="comment" className="text-gray-300">Comment:</FormLabel>
            <TextFieldArea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="mt-2 bg-[#1c1c1c] text-white border border-gray-700"
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
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {isAddingReview ? <LoadingScreen size="sm" /> : "Submit Review"}
          </Button>
        </form>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Reviews</h2>
          {isLoadingReviews ? (
            <LoadingScreen />
          ) : reviewsError ? (
            <p className="text-red-500">Failed to load reviews. Please try again later.</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet.</p>
          ) : (
            <div className="space-y-5">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[#1c1c1c] rounded-lg p-4 border border-gray-800">
                  <p className="font-semibold text-white">{review.userName}</p>
                  <p className="text-gray-300 mt-1">{review.comment}</p>
                  <p className="text-yellow-400 mt-1">{`Rating: ${review.rating}/5`}</p>
                  <p className="text-sm text-gray-500 mt-1">
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