import axiosInstance from "./axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const addMovieToList = async (movieData) => {
  const { data } = await axiosInstance.post("/movie-list", movieData);
  return data;
};

export const fetchMovieList = async (userId) => {
  const { data } = await axiosInstance.get(`/movie-list/${userId}`);
  return data;
};

export const useMovieList = (userId) => {
  return useQuery({
    queryKey: ["movieList", userId],
    queryFn: () => fetchMovieList(userId),
    enabled: !!userId,
  });
};

export const useAddMovieList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieData) => {
      toast.loading("Adding movie to your list...");
      return addMovieToList(movieData);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Movie added to your list!");
      queryClient.invalidateQueries({ queryKey: ["movieList"] });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error?.response?.data?.error || "Failed to add movie.");
      console.error("Error adding movie:", error.message);
    },
  });
};