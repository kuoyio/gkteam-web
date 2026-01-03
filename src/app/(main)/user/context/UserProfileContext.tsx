"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "@/src/api/user";
import { UserProfileResponse } from "@/src/type/user";

interface UserProfileContextType {
  userProfile: UserProfileResponse | null;
  setUserProfile: (profile: UserProfileResponse) => void;
  refreshProfile: () => Promise<void>;
  isLoading: boolean;
}

const UserProfileContext = createContext<UserProfileContextType | null>(null);

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = async () => {
    try {
      setIsLoading(true);
      const profile = await getUserProfile();
      setUserProfile(profile);
    } catch {} finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile, refreshProfile, isLoading }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error("useUserProfile must be used within UserProfileProvider");
  return context;
}
