import { createContext, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<
  { user: string | null; login: (name: string) => void; logout: () => void } | undefined
>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const login = (name: string) => {
    setUser(name);
  };
  const logout = () => {
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const UserProfile = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <h1>{user ? `Welcome, ${user}` : "Please log in"}</h1>
      {user ? <button onClick={logout}>Logout</button> : <button onClick={() => login("Alice")}>Login as Alice</button>}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <UserProfile />
    </AuthProvider>
  );
};

export default App;
