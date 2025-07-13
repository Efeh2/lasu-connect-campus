import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
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
  session: Session | null;
}

type UserAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; session: Session } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "SET_ONLINE_STATUS"; payload: boolean }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
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
        session: action.payload.session,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        session: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        session: null,
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

  // Helper function to transform Supabase user to our User type
  const transformUser = (supabaseUser: SupabaseUser, profile: any): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      name: profile?.first_name
        ? `${profile.first_name} ${profile.last_name || ""}`.trim()
        : supabaseUser.email?.split("@")[0] || "",
      role: profile?.role || "student",
      level: profile?.level,
      avatar: profile?.avatar_url,
      isOnline: profile?.is_online || false,
      firstName: profile?.first_name,
      lastName: profile?.last_name,
      phone: profile?.phone,
      studentId: profile?.student_id,
    };
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Check for existing session first
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && mounted) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          const user = transformUser(session.user, profile);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user, session },
          });
        } else if (mounted) {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }

      initializedRef.current = true;
    };

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);

      // Only handle auth changes after initial load
      if (!initializedRef.current) return;

      if (session?.user && mounted) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        const user = transformUser(session.user, profile);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, session },
        });
      } else if (mounted) {
        dispatch({ type: "LOGOUT" });
      }
    });

    // Initialize auth
    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signup = async (userData: SignupData) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role,
            level: userData.level,
            student_id: userData.studentId,
            phone: userData.phone,
          },
        },
      });

      if (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.message });
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user && !data.session) {
        toast({
          title: "Check your email",
          description:
            "Please check your email for a verification link to complete your signup.",
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Signup failed";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.message });
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // The auth state change listener will handle setting the user
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        dispatch({ type: "LOGOUT" });
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
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
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
