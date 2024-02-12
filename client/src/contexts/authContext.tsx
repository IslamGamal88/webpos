import { PropsWithChildren, createContext, useState } from "react";

interface AuthContext {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<null>>;
}

const AuthContext = createContext<AuthContext>({
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
