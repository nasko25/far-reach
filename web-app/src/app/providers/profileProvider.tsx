"use client";
import { usePrivy } from "@privy-io/react-auth";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserProfile = {
  address: string;
  identity: string;
  platform: string;
  displayName: string;
  avatar: string;
  description: string;
  email: null | string;
  location: string;
  header: null | string;
  contenthash: null | string;
  links: {
    farcaster: {
      link: string;
      handle: string;
    };
  };
};

type UserProfileProviderProps = {
  children: ReactNode;
};

type UserProfileContextType = {
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

const UserProfileProvider = ({ children }: UserProfileProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, authenticated } = usePrivy();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authenticated) setUserProfile(null);
      if (!user) return;
      try {
        if (user && user.farcaster) {
          const response = await fetch(`https://api.web3.bio/profile/farcaster/${user.farcaster.username}`);
          const serializedResponse = await response.json();
          setUserProfile(serializedResponse);
        }
      } catch (err) {
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, authenticated]);

  return <UserProfileContext.Provider value={{ userProfile, loading, error }}>{children}</UserProfileContext.Provider>;
};

const useUserProfile = (): UserProfileContextType => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};

export { UserProfileProvider, UserProfileContext, useUserProfile };
