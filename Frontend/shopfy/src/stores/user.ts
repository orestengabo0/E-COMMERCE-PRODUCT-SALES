import axios from "axios";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserLogin {
    email: string,
    password: string
}

interface DecodeToken {
    id: string,
    role: string
}

interface ApiResponse {
  success: boolean;
  message: string;
}

interface UserState {
  users: User[];
  createUser: (user: User) => Promise<{ success: boolean; message: string }>;
  loginUser: (user: UserLogin) => Promise<{ success: boolean; message: string, role?: string}>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  createUser: async (user) => {
    if (!user.username || !user.email || !user.password) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        set((state) => ({ users: [...state.users, user] }));
        return { success: true, message: "User Registered Successfully." };
      }

      return { success: false, message: "User Registration failed." };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong.",
      };
    }
  },
  loginUser: async (user) => {
    if (!user.email || !user.password)
      return { success: false, message: "Please fill in all fields." };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        const { token } = res.data;
        localStorage.setItem("authToken", token)
        const decodedToken: DecodeToken = jwtDecode(token)
        const { role } = decodedToken
        return { success: true, message: "Login successful.", role };
      }
      return { success: false, message: "Login failed." };
    } catch (error) {
      return { success: false, message: "Something went wrong." };
    }
  },
}));
