import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserInformation,
} from "@/lib/queries/auth";

export function useAuth() {
  const register = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data) {
        console.log("Registration successful:", data);
      } else {
        console.error("Registration failed");
      }
    },
    onError: (error) => {
      console.log("Error during registration:", error);
    },
  });
  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data) {
        console.log("Login successful:", data);
      } else {
        console.error("Login failed");
      }
    },
    onError: (error) => {
      console.log("Error during login:", error);
    },
  });
  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      if (data) {
        console.log("Logout successful:", data);
      } else {
        console.error("Logout failed");
      }
    },
    onError: (error) => {
      console.log("Error during logout:", error);
    },
  });

  return {
    register,
    login,
    logout,
  };
}


