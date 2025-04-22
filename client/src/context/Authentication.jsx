import { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import LoadingScreen from "../components/ui/LoadingScreen";
import { loginUser, registerUser, getCurrentUser } from "../api/auth";

const AuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); 
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
    setIsLoading(false); 
  }, []);

  const signInUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); 
  };

  const signOutUser = () => {
    setUser(null);
    localStorage.removeItem("user"); 
  };

  if (isLoading) {
    return <LoadingScreen />; 
  }

  return (
    <AuthContext.Provider value={{ user, signInUser, signOutUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within an UserAuthProvider");
  }
  return context;
};

export const useLogin = () => {
  const { signInUser } = useUserAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const user = response?.user;

      if (user) {
        signInUser(user);
        toast.success("Login Successful", {
          description: `Welcome back, ${user.username}!`,
        });

        const isAdmin = user.role === "admin";
        navigate(isAdmin ? "/admin-dashboard" : "/profile-selection");
      } else {
        toast.error("Login failed. No user data received.");
      }
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message ||
        "An error occurred. Please try again.";

      toast.error("Login Failed", { description: message });
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration Successful", {
        description: "Your account has been created successfully.",
      });
      navigate("/signin");
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message ||
        "An error occurred. Please try again.";

      toast.error("Registration Failed", { description: message });
    },
  });
};

export const useCurrentUser = () => {
  const { signInUser, setUser } = useUserAuth();
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    onSuccess: (user) => {
      if (user) {
        signInUser(user);
        navigate("/");
      }
    },
    onError: () => {
      setUser(null);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};