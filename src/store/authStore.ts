import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Only password is fixed, username can be custom
const VALID_PASSWORD = 'chatpass123';

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  login: (username: string, password: string) => {
    if (username.trim().length >= 3 && password === VALID_PASSWORD) {
      set({ isAuthenticated: true, username: username.trim() });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false, username: null }),
}));