import axiosInstance from "./axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const addReview = async (movieData) => {
  const { data } = await axiosInstance.post("/reviews", movieData);
  return data;
};

export const getReviews = async () => {
  const { data } = await axiosInstance.get("/reviews");
  return data;
};

export const useAddReview = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      toast.success("Review submitted successfully.");
      navigate("/");
    },
    onError: (error) => {
      toast.error("Failed to submit review", {
        description: error?.response?.data?.message || "Something went wrong!",
      });
    },
  });
};

export const useGetReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
    refetchOnWindowFocus: false,
    onError: (error) => {
      toast.error("Failed to fetch reviews", {
        description: error?.response?.data?.message || "Something went wrong!",
      });
    },
  });
};