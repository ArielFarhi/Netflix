import axiosInstance from "./axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const getPrograms = async (params = {}) => {
  const { data } = await axiosInstance.get("/programs", { params });
  return data;
};

export const getTopRatedPrograms = async (params = {}) => {
  const { data } = await axiosInstance.get("/programs/top-rated", { params });
  return data;
};

export const getAnimatedPrograms = async (params = {}) => {
  const { data } = await axiosInstance.get("/programs/animated", { params });
  return data;
};

export const searchPrograms = async (params = {}) => {
  const { data } = await axiosInstance.get("/programs/search", { params });
  return data;
};

export const getProgramDetails = async (id, type = "movie") => {
  const { data } = await axiosInstance.get(`/programs/${id}`, {
    params: { type },
  });
  return data;
};

export const addPrograms = async (programData) => {
  const { data } = await axiosInstance.post("/programs", programData);
  return data;
};

export const usePrograms = (params = {}) =>
  useQuery({
    queryKey: ["programs", params],
    queryFn: () => getPrograms(params),
    onError: (err) =>
      toast.error("Failed to fetch programs", {
        description: err?.response?.data?.message || "Something went wrong!",
      }),
    refetchOnWindowFocus: false,
  });

export const useGetTopRatedPrograms = (params = {}) =>
  useQuery({
    queryKey: ["top-programs", params],
    queryFn: () => getTopRatedPrograms(params),
    onError: (err) =>
      toast.error("Failed to fetch top rated programs", {
        description: err?.response?.data?.message || "Something went wrong!",
      }),
    refetchOnWindowFocus: false,
  });

export const useGetAnimatedPrograms = (params = {}) =>
  useQuery({
    queryKey: ["animated-programs", params],
    queryFn: () => getAnimatedPrograms(params),
    onError: (err) =>
      toast.error("Failed to fetch animated programs", {
        description: err?.response?.data?.message || "Something went wrong!",
      }),
    refetchOnWindowFocus: false,
  });

export const useSearchPrograms = (params = {}) =>
  useQuery({
    queryKey: ["searchPrograms", params],
    queryFn: () => searchPrograms(params),
    onError: (err) =>
      toast.error("Failed to search programs", {
        description: err?.response?.data?.message || "Something went wrong!",
      }),
    refetchOnWindowFocus: false,
  });

export const useProgramDetail = (id, type = "movie") =>
  useQuery({
    queryKey: ["programDetail", id, type],
    queryFn: () => getProgramDetails(id, type),
    enabled: !!id,
    onError: (err) =>
      toast.error("Failed to fetch program details", {
        description: err?.response?.data?.message || "Something went wrong!",
      }),
  });

export const useAddProgram = () =>
  useMutation({
    mutationFn: addPrograms,
    onSuccess: () => toast.success("Program added successfully."),
    onError: (err) =>
      toast.error("Failed to add program", {
        description: err?.response?.data?.message || "Something went wrong!",
      }),
  });

export const getSavedPrograms = async () => {
  const { data } = await axiosInstance.get("/my-list"); 
  return data;
};

export const useSavedPrograms = () =>
  useQuery({
    queryKey: ["saved-programs"],
    queryFn: getSavedPrograms,
    onError: (err) =>
      toast.error("Failed to load your saved list", {
        description: err?.response?.data?.message || "Something went wrong!",
      }),
    refetchOnWindowFocus: false,
  });