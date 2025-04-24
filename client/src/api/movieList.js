import axiosInstance from "./axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// קריאה לשרת כדי להוסיף סרט לרשימה
export const addMovieToList = async (movieData) => {
  const { data } = await axiosInstance.post("/movie-list", movieData);
  return data;
};

// קריאה לשרת כדי להביא את רשימת הסרטים של המשתמש
export const fetchMovieList = async (userId) => {
  const { data } = await axiosInstance.get(`/movie-list/${userId}`);
  return data;
};

// hook שמחזיר את הרשימה לפי מזהה המשתמש
export const useMovieList = (userId) => {
  return useQuery({
    queryKey: ["movieList", userId],
    queryFn: () => fetchMovieList(userId),
    enabled: !!userId, // מבטיח שהקריאה תתבצע רק אם יש userId
  });
};

// hook להוספת סרט לרשימת המשתמש
export const useAddMovieList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieData) => {
      toast.loading("Adding movie to your list...");
      return addMovieToList(movieData);
    },
    onSuccess: (data, movieData) => {
      toast.dismiss();
      toast.success("Movie added to your list!");
      // רענון מדויק של הרשימה לפי מזהה המשתמש
      queryClient.invalidateQueries(["movieList", movieData.userId]);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error?.response?.data?.error || "Failed to add movie.");
      console.error("Error adding movie:", error.message);
    },
  });
};