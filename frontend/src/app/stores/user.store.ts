import { create } from 'zustand';

export interface UserFullName {
  firstName: string;
  lastName?: string;
}

export interface UserResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  email: string;
  name: UserFullName;
}

export type UserState = {
  token?: string;
  isLoggedIn: boolean;
  user?: UserResponse;
  setToken: (token: string) => void;
  loginUser: (user: UserResponse) => void;
  logoutUser: () => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()((set) => {
  return {
    isLoggedIn: false,
    setToken: (token: string) => {
      set({ token, isLoggedIn: true });
    },
    loginUser: (user: UserResponse) => {
      set({ user, isLoggedIn: true });
    },
    logoutUser: () => {
      set({ token: '',  isLoggedIn: false, user: undefined });
    },
    logout: () => {
      set({ token: '',  isLoggedIn: false, user: undefined });
      window.location.replace('/');
    },
  };
});
