import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getQueryFn } from "./queryClient";

interface User {
  id: number;
  username: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  isAdmin: boolean;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  refetchUser: async () => {},
  logout: async () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading, refetch } = useQuery<User | null>({
    queryKey: ["/api/auth/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const refetchUser = async () => {
    await refetch();
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      queryClient.setQueryData(["/api/auth/me"], null);
      await refetch();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user: user ?? null, isLoading, refetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within UserProvider");
  }
  return context;
}
