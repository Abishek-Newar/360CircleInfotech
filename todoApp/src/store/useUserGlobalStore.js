import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // Import persist middleware
import { createJSONStorage } from "zustand/middleware"; // Import createJSONStorage

const useUserGlobalStore = create(
  persist(
    (set, get) => ({
      user: null,
      updateUser: (user) => {
        set({
          user,
        });
      },
    }),
    {
      name: "todo-app-user-storage",
      storage: createJSONStorage(() => AsyncStorage), // Use createJSONStorage
    }
  )
);

export const useOtp = create(
  persist(
    (set, get) => ({
      otp: null,
      setOtp: (otp) => {
        set({
          otp,
        })
      }
    }),
    {
      name: "otp-storage",
      storage: createJSONStorage(()=>AsyncStorage)
    }

  )
)

export default useUserGlobalStore;
