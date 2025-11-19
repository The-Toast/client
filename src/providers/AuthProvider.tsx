import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type AuthContextType = {
  signedIn: boolean;
  setSignedIn: (v: boolean) => Promise<void>;
  hydrated: boolean;
  userEmail?: string | null;
  setUserEmail: (email: string | null) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'auth.signedIn';
const EMAIL_KEY = 'auth.email';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, _setSignedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [userEmail, _setUserEmail] = useState<string | null>(null);

  // hydrate from storage once on mount
  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem(STORAGE_KEY);
        const email = await AsyncStorage.getItem(EMAIL_KEY);
        if (v === 'true') _setSignedIn(true);
        if (email) _setUserEmail(email);
      } catch {
        // ignore
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  const setSignedIn = async (v: boolean) => {
    _setSignedIn(v);
    try {
      if (v) {
        await AsyncStorage.setItem(STORAGE_KEY, 'true');
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
        await AsyncStorage.removeItem(EMAIL_KEY);
        _setUserEmail(null);
      }
    } catch {
      // ignore persistence errors
    }
  };

  const setUserEmail = async (email: string | null) => {
    _setUserEmail(email);
    try {
      if (email) {
        await AsyncStorage.setItem(EMAIL_KEY, email);
      } else {
        await AsyncStorage.removeItem(EMAIL_KEY);
      }
    } catch {
      // ignore persistence errors
    }
  };

  const logout = async () => {
    await setSignedIn(false);
    await setUserEmail(null);
  };

  const value = useMemo(
    () => ({ signedIn, setSignedIn, hydrated, userEmail, setUserEmail, logout }),
    [signedIn, hydrated, userEmail]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthProvider;
