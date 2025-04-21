import axiosInstance from "./axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

//
// === פונקציות API ===
//

// הוספת סרט לרשימה
export const addMovieToList = async (movieData) => {
  const { data } = await axiosInstance.post("/movie-list", movieData);
  return data;
};

// הבאת רשימת סרטים לפי userId
export const fetchMovieList = async (userId) => {
  const { data } = await axiosInstance.get(`/movie-list/${userId}`);
  return data;
};


//
// === React Query Hooks ===
//

// hook לקריאת רשימת סרטים של המשתמש
export const useMovieList = (userId) => {
  return useQuery({
    queryKey: ["movieList", userId],
    queryFn: () => fetchMovieList(userId),
    enabled: !!userId,
  });
};

// hook להוספת סרט לרשימה עם Toast ועדכון Cache
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