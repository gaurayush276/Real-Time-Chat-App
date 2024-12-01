import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme:  localStorage.getItem("chat-theme") || "coffee", // Initialize with localStorage
  setTheme: (newTheme) => {
    localStorage.setItem("chat-theme", newTheme); // Persist in localStorage
    set({ theme: newTheme }); // Update state and trigger re-render
  },
}));
