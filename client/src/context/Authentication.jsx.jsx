import { createContext, useContext, useState, useEffect } from "react";
import LoadingScreen from "../components/ui/LoadingScreen";

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
    <AuthContext.Provider value={{ user, signInUser, signOutUser }}>
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