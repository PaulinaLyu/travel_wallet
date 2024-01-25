import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import axios from "axios";

interface AuthState {
  user: IUser | null;
  //   isAuth: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  registration: (email: string, password: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    immer((set) => ({
      user: null,
      //   isAuth: false,
      isLoading: false,
      login: async (email, password) => {
        try {
          const response = await AuthService.login(email, password);
          console.log(response);
          localStorage.setItem("token", response.data.accessToken);
          set({ user: response.data.user });
        } catch (e: any) {
          console.log(e.response?.data?.message);
        }
      },
      registration: async (email, password) => {
        try {
          const response = await AuthService.registration(email, password);
          console.log(response);
          localStorage.setItem("token", response.data.accessToken);
          set({ user: response.data.user });
        } catch (e: any) {
          console.log(e.response?.data?.message);
        }
      },
      logout: async () => {
        try {
          await AuthService.logout();
          localStorage.removeItem("token");
          set({ user: null });
        } catch (e: any) {
          console.log(e.response?.data?.message);
        }
      },
      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
            withCredentials: true,
          });
          console.log(response);
          localStorage.setItem("token", response.data.accessToken);
          set({ user: response.data.user });
        } catch (e: any) {
          console.log(e.response?.data?.message);
        } finally {
          set({ isLoading: false });
        }
      },
    }))
  )
);
