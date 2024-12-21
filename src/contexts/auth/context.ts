import { AuthState } from "@/types/types/contexts/states";
import { Client, Employee } from "@/types/types/model/users";
import { createContext } from "react";

type AuthContext = AuthState & {
  login: (profile: Employee | Client) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContext);

export default AuthContext;