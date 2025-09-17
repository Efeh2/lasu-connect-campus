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
  const transformUser = (
    supabaseUser: SupabaseUser,
    profile: any = null
  ): User => {
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
          // Fetch profile data to get the correct role
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error(
              "Profile fetch error during initialization:",
              profileError
            );
          }

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
        // Fetch profile data to get the correct role
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error(
            "Profile fetch error during auth change:",
            profileError
          );
        }

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
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
        const errorMessage =
          "Supabase is not configured. Please check your environment variables.";
        dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
        toast({
          title: "Configuration Error",
          description:
            "Please set up your Supabase credentials in the .env file",
          variant: "destructive",
        });
        return;
      }

      const redirectUrl = `${window.location.origin}/`;

      // First, sign up the user with metadata
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role,
            level: userData.level || null,
            student_id: userData.studentId || null,
            phone: userData.phone || null,
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

      // Create profile immediately after user creation
      if (data.user) {
        try {
          // Try to create profile immediately
          const { error: createError } = await supabase
            .from("profiles")
            .insert({
              id: data.user.id,
              first_name: userData.firstName,
              last_name: userData.lastName,
              email: userData.email,
              role: userData.role,
              level: userData.level || null,
              student_id: userData.studentId || null,
              phone: userData.phone || null,
              department: "Computer Science",
            } as any);

          if (createError) {
            console.error("Profile creation error:", createError);
            // If it fails due to duplicate (profile already exists), that's okay
            if (createError.code !== "23505") {
              console.warn(
                "Profile creation failed, but user was created successfully"
              );
            }
          } else {
            console.log("Profile created successfully");
          }
        } catch (error) {
          console.error("Profile creation error:", error);
        }
      }

      if (data.user && !data.session) {
        toast({
          title: "Check your email",
          description:
            "Please check your email for a verification link to complete your signup.",
        });
      } else if (data.user && data.session) {
        // User is automatically signed in - fetch profile to get correct role
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error during signup:", profileError);
        }

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: transformUser(data.user, profile),
            session: data.session,
          },
        });
        toast({
          title: "Welcome!",
          description: "Your account has been created successfully.",
        });
      }
    } catch (error) {
      let errorMessage = "Signup failed";

      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage =
            "Network error. Please check your Supabase configuration.";
        } else if (error.message.includes("ERR_NAME_NOT_RESOLVED")) {
          errorMessage =
            "Invalid Supabase URL. Please check your environment variables.";
        } else {
          errorMessage = error.message;
        }
      }

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
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
