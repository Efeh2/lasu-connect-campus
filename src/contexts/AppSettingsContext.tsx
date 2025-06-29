
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

interface AppSettings {
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    allowDirectMessages: boolean;
    showProfile: boolean;
  };
  preferences: {
    defaultDashboard: 'overview' | 'messages' | 'assignments';
    itemsPerPage: 10 | 25 | 50;
    autoSave: boolean;
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
}

const defaultSettings: AppSettings = {
  notifications: {
    email: true,
    push: true,
    inApp: true,
  },
  privacy: {
    showOnlineStatus: true,
    allowDirectMessages: true,
    showProfile: true,
  },
  preferences: {
    defaultDashboard: 'overview',
    itemsPerPage: 25,
    autoSave: true,
  },
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    fontSize: 'medium',
  },
};

type SettingsAction =
  | { type: 'UPDATE_NOTIFICATIONS'; payload: Partial<AppSettings['notifications']> }
  | { type: 'UPDATE_PRIVACY'; payload: Partial<AppSettings['privacy']> }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AppSettings['preferences']> }
  | { type: 'UPDATE_ACCESSIBILITY'; payload: Partial<AppSettings['accessibility']> }
  | { type: 'RESET_SETTINGS' }
  | { type: 'LOAD_SETTINGS'; payload: AppSettings };

const settingsReducer = (state: AppSettings, action: SettingsAction): AppSettings => {
  switch (action.type) {
    case 'UPDATE_NOTIFICATIONS':
      return {
        ...state,
        notifications: { ...state.notifications, ...action.payload },
      };
    case 'UPDATE_PRIVACY':
      return {
        ...state,
        privacy: { ...state.privacy, ...action.payload },
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };
    case 'UPDATE_ACCESSIBILITY':
      return {
        ...state,
        accessibility: { ...state.accessibility, ...action.payload },
      };
    case 'RESET_SETTINGS':
      return defaultSettings;
    case 'LOAD_SETTINGS':
      return action.payload;
    default:
      return state;
  }
};

interface AppSettingsContextType {
  settings: AppSettings;
  updateNotifications: (updates: Partial<AppSettings['notifications']>) => void;
  updatePrivacy: (updates: Partial<AppSettings['privacy']>) => void;
  updatePreferences: (updates: Partial<AppSettings['preferences']>) => void;
  updateAccessibility: (updates: Partial<AppSettings['accessibility']>) => void;
  resetSettings: () => void;
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const AppSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        dispatch({ type: 'LOAD_SETTINGS', payload: parsedSettings });
      } catch (error) {
        console.error('Failed to load settings from localStorage:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
  }, [settings]);

  const updateNotifications = (updates: Partial<AppSettings['notifications']>) => {
    dispatch({ type: 'UPDATE_NOTIFICATIONS', payload: updates });
  };

  const updatePrivacy = (updates: Partial<AppSettings['privacy']>) => {
    dispatch({ type: 'UPDATE_PRIVACY', payload: updates });
  };

  const updatePreferences = (updates: Partial<AppSettings['preferences']>) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: updates });
  };

  const updateAccessibility = (updates: Partial<AppSettings['accessibility']>) => {
    dispatch({ type: 'UPDATE_ACCESSIBILITY', payload: updates });
  };

  const resetSettings = () => {
    dispatch({ type: 'RESET_SETTINGS' });
  };

  return (
    <AppSettingsContext.Provider value={{
      settings,
      updateNotifications,
      updatePrivacy,
      updatePreferences,
      updateAccessibility,
      resetSettings,
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};
