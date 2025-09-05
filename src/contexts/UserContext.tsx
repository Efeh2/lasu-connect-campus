import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { useToast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "teacher" | "admin";
  level?: string;
  avatar?: string;
  isOnline: boolean;
  firstName?: string;
  lastName?: string;
  phone?: string;
  studentId?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  session: null;
}

type UserAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "SET_ONLINE_STATUS"; payload: boolean }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  session: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case "SET_ONLINE_STATUS":
      return {
        ...state,
        user: state.user ? { ...state.user, isOnline: action.payload } : null,
      };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

interface UserContextType extends UserState {
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  clearError: () => void;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
  level: string;
  password: string;
  role: "student" | "teacher" | "admin";
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { toast } = useToast();
  const initializedRef = useRef(false);

  useEffect(() => {
    // With auth removed, just mark loading false once on mount
    if (!initializedRef.current) {
      dispatch({ type: "SET_LOADING", payload: false });
      initializedRef.current = true;
    }
  }, []);

  const signup = async (_userData: SignupData) => {
    dispatch({ type: "LOGIN_START" });
    dispatch({ type: "LOGIN_FAILURE", payload: "Authentication is disabled." });
    toast({
      title: "Signup disabled",
      description: "Authentication has been removed from this app.",
      variant: "destructive",
    });
  };

  const login = async (_email: string, _password: string) => {
    dispatch({ type: "LOGIN_START" });
    dispatch({ type: "LOGIN_FAILURE", payload: "Authentication is disabled." });
    toast({
      title: "Login disabled",
      description: "Authentication has been removed from this app.",
      variant: "destructive",
    });
  };

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    toast({ title: "Logged out", description: "You have been logged out." });
  };

  const updateUser = (updates: Partial<User>) => {
    dispatch({ type: "UPDATE_USER", payload: updates });
  };

  const setOnlineStatus = (isOnline: boolean) => {
    dispatch({ type: "SET_ONLINE_STATUS", payload: isOnline });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        updateUser,
        setOnlineStatus,
        clearError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
