import { createContext, useContext } from "react";

const AuthContext = createContext();

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Error! useAuthContext must be used within AuthProvidor.");
  }

  return context;
};

export { useAuthContext };
export default AuthContext;
