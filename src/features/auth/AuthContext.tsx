import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type UserRole = "Executive" | "Program Manager" | "Store Manager" | "Administrator";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials: string;
}

const demoUsers: Record<string, AuthUser> = {
  executive: { id: "u-100", name: "Alex Morgan", email: "executive@retailvision.demo", role: "Executive", initials: "AM" },
  program: { id: "u-101", name: "Tom Henry", email: "program@retailvision.demo", role: "Program Manager", initials: "TH" },
  store: { id: "u-102", name: "Jordan Blake", email: "store@retailvision.demo", role: "Store Manager", initials: "JB" },
  admin: { id: "u-103", name: "Riley Patel", email: "admin@retailvision.demo", role: "Administrator", initials: "RP" }
};

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  loginAsDemo: (roleKey: keyof typeof demoUsers) => void;
  logout: () => void;
}

const STORAGE_KEY = "retailvision-demo-user";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const value = useMemo<AuthContextValue>(() => ({
    user,
    async login(email, password) {
      await new Promise((resolve) => window.setTimeout(resolve, 450));
      if (!email.trim() || password.length < 6) {
        throw new Error("Enter a valid email and a password with at least six characters.");
      }
      const matched = Object.values(demoUsers).find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());
      const authenticated = matched ?? demoUsers.program;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticated));
      setUser(authenticated);
      return authenticated;
    },
    loginAsDemo(roleKey) {
      const authenticated = demoUsers[roleKey];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticated));
      setUser(authenticated);
    },
    logout() {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    }
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
