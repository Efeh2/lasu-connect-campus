
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  level?: string;
  avatar?: string;
  isOnline: boolean;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type UserAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'CLEAR_ERROR' };

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'SET_ONLINE_STATUS':
      return {
        ...state,
        user: state.user ? { ...state.user, isOnline: action.payload } : null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

interface UserContextType extends UserState {
  login: (email: string, password: string, userType: string, level?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  clearError: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = async (email: string, password: string, userType: string, level?: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        role: userType as 'student' | 'teacher' | 'admin',
        level: userType === 'student' ? level : undefined,
        isOnline: true,
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (updates: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };

  const setOnlineStatus = (isOnline: boolean) => {
    dispatch({ type: 'SET_ONLINE_STATUS', payload: isOnline });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <UserContext.Provider value={{
      ...state,
      login,
      logout,
      updateUser,
      setOnlineStatus,
      clearError,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
