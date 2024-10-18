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

interface UpdateUser {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
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
  currentUser: User | null;
  users: User[];
  messages: Message[];
  isLogggedIn: boolean;
  role: string | null;
  createUser: (user: User) => Promise<{ success: boolean; message: string }>;
  loginUser: (
    user: UserLogin
  ) => Promise<{ success: boolean; message: string; role?: string }>;
  logoutUser: () => void;
  updateUser: (
    user: UpdateUser
  ) => Promise<{ success: boolean; message: string }>;
  createMessage: (
    message: Message
  ) => Promise<{ success: boolean; message: string }>;
  getCurrentUser: () => Promise<void>;
  checkToken: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
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
  checkToken: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken: DecodeToken = jwtDecode(token);
        const { role } = decodedToken;
        set({ isLogggedIn: true, role });
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("authToken");
      }
    }
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
  updateUser: async (user) => {
    if (!user.username || !user.email) {
      return { success: false, message: "Please fill in all required fields." };
    }
    if (
      user.newPassword &&
      user.confirmPassword &&
      user.newPassword !== user.confirmPassword
    ) {
      return {
        success: false,
        message: "Confirmed password doesn't match the new password.",
      };
    }
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return { success: false, message: "No token found, please login." };
      }

      const res = await axios.put(
        `http://localhost:5000/api/auth/update/user/me`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", res);

      if (res.data.success) {
        set((state) => ({
          users: state.users.map((u) =>
            u.email === user.email ? { ...u, ...user } : u
          ),
        }));
        return { success: true, message: "User profile updated successfully." };
      }
      return { success: false, message: "Failed to update." };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Incorrect username or password." };
    }
  },
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        set({ currentUser: null, isLogggedIn: false });
        return;
      }
      const res = await axios.get("http://localhost:5000/api/auth/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        set({ currentUser: res.data.user });
      } else {
        set({ currentUser: null });
      }
    } catch (error) {
      set({ currentUser: null });
    }
  },
}));
