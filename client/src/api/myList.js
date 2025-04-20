import axiosInstance from "./axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export const addMovieToList = async (movie) => {
    const { data } = await axiosInstance.post("/my-list", movie);
    return data;
};

export const getMyMovieList = async (userId) => {
    const { data } = await axiosInstance.get(`/my-list/${userId}`);
    return data;
};

export const useMyMovieList = (userId) =>
    useQuery({
        queryKey: ["my-list", userId],
        queryFn: () => getMyMovieList(userId),
        enabled: !!userId,
        onError: (err) =>
            toast.error("Failed to fetch your list", {
                description: err?.response?.data?.message || "Something went wrong!",
            }),
    });

export const useAddMovie = () =>
    useMutation({
        mutationFn: addMovieToList,
        onSuccess: () => toast.success("Added to your list!"),
        onError: (err) =>
            toast.error("Failed to add movie", {
                description: err?.response?.data?.message || "Something went wrong!",
            }),
    });