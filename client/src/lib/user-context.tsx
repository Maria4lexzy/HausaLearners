import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem("lingoquest_user_id");
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem("lingoquest_user_id", userId);
    } else {
      localStorage.removeItem("lingoquest_user_id");
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
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
