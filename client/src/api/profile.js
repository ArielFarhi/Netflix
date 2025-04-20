import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "./axiosInstance";

const fetchProfiles = async () => {
  const response = await axios.get("/profiles");
  return response.data;
};

const createProfile = async (profile) => {
  const response = await axios.post("/profiles", profile);
  return response.data;
};

export const useProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: fetchProfiles,
    onError: (error) => {
      toast.error("Failed to fetch profiles", {
        description: error?.response?.data?.message || "Something went wrong!",
      });
    },
    refetchOnWindowFocus: false,
  });
};

export const useAddProfile = () => {
  return useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      toast.success("Profile created successfully.");
    },
    onError: (error) => {
      toast.error("Profile creation failed", {
        description: error?.response?.data?.message || "Something went wrong!",
      });
    },
  });
};