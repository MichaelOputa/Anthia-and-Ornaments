import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | { email: string; id: string } | null;
  session: Session | null;
  loading: boolean;
  checkingAdmin: boolean;
  isAdmin: boolean;
  adminCheckError: string | null;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'anthia_admin_local_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | { email: string; id: string } | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckError, setAdminCheckError] = useState<string | null>(null);

  const sessionAccessToken = session?.access_token;

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Local fallback mode session check
      const localSession = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (localSession) {
        try {
          const parsed = JSON.parse(localSession);
          setUser(parsed);
        } catch {
          localStorage.removeItem(LOCAL_ADMIN_KEY);
        }
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsAdmin(Boolean(user));
      setCheckingAdmin(false);
      setAdminCheckError(null);
      return;
    }

    if (!sessionAccessToken) {
      setIsAdmin(false);
      setCheckingAdmin(false);
      setAdminCheckError(null);
      return;
    }

    let active = true;
    setCheckingAdmin(true);
    setIsAdmin(false);
    setAdminCheckError(null);
    void (async () => {
      try {
        const { data, error } = await supabase.rpc('is_admin');
        if (!active) return;
        setIsAdmin(!error && data === true);
        setAdminCheckError(error?.message ?? null);
      } catch (error: unknown) {
        if (!active) return;
        setIsAdmin(false);
        setAdminCheckError(error instanceof Error ? error.message : 'Could not verify admin access');
      } finally {
        if (active) setCheckingAdmin(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [sessionAccessToken, user?.id]);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      setUser(data.user);
      setSession(data.session);
      return {};
    } else {
      // Local demo mode for quick initial onboarding & testing
      if (password.length < 4) {
        return { error: 'Password must be at least 4 characters long.' };
      }

      const mockUser = {
        id: 'local-admin-1',
        email: email || 'admin@anthiaandornament.com',
      };
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      return {};
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        checkingAdmin,
        isAdmin,
        adminCheckError,
        isConfigured: isSupabaseConfigured,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
