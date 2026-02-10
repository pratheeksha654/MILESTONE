import { create } from "zustand";

export const useUserStore = create((set) => ({
  profile: {
    name: "",
    age: "",
    role: "",
    bio: "",
  },

  setProfile: (profileData) =>
    set(() => ({
      profile: profileData,
    })),

  updateProfileField: (field, value) =>
    set((state) => ({
      profile: {
        ...state.profile,
        [field]: value,
      },
    })),
}));