import React, {
  PropsWithChildren,
  createContext,
  useState,
} from "react";

const AuthContext = createContext({
  response: null,
  token: null,
  setToken: () => {},
  setResponse: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [response, setResponse] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  const updateToken = (newToken: string) => {
    setToken(newToken);
  };

  const value = {
    response,
    setResponse,
    token,
    setToken: updateToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
