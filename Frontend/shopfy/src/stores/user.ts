import axios from "axios";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface DecodeToken {
  id: string;
  role: string;
}

interface Message {
  name: string;
  email: string;
  message: string;
}

interface UserState {
  users: User[];
  messages: Message[];
  isLogggedIn: boolean;
  role: string | null;
  createUser: (user: User) => Promise<{ success: boolean; message: string }>;
  loginUser: (
    user: UserLogin
  ) => Promise<{ success: boolean; message: string; role?: string }>;
  logoutUser: () => void;
  createMessage: (
    message: Message
  ) => Promise<{ success: boolean; message: string }>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  messages: [],
  isLogggedIn: false,
  role: null,
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
        localStorage.setItem("authToken", token);
        const decodedToken: DecodeToken = jwtDecode(token);
        const { role } = decodedToken;
        set({ isLogggedIn: true, role });
        return { success: true, message: "Login successful.", role };
      }
      return { success: false, message: "Login failed." };
    } catch (error) {
      return { success: false, message: "Something went wrong." };
    }
  },
  logoutUser: () => {
    localStorage.removeItem("authToken");
    set({ isLogggedIn: false, users: [] });
  },
  createMessage: async (message) => {
    if (!message.name || !message.email || !message.message)
      return { success: false, message: "Please fill in all fields." };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages/send",
        message,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        set((state) => ({ messages: [...state.messages, message] }));
        return { success: true, message: "Message sent successfully." };
      }
      return { success: false, message: "Failed to send Message." };
    } catch (error) {
      return { success: false, message: "Something went wrong." };
    }
  },
}));
