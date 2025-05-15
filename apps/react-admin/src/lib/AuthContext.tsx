import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, auth, Profile } from './supabase';

console.log('[AuthContext] Рендер компонента AuthProvider');

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { full_name?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  console.log('[AuthProvider] Рендер');
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[AuthProvider] useEffect старт');
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[AuthProvider] getSession результат:', session);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setLoading(false);
        loadProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }).catch((err) => {
      console.error('[AuthProvider] Ошибка в getSession:', err);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthProvider] onAuthStateChange:', event, session);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setLoading(false);
        await loadProfile(session.user.id);
        setLoading(false);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Загрузка профиля пользователя
  const loadProfile = async (userId: string) => {
    try {
      console.log('[AuthProvider] loadProfile старт:', userId);
      const profile = await auth.getProfile(userId);
      setProfile(profile);
      console.log('[AuthProvider] loadProfile успех:', profile);
    } catch (error) {
      console.error('[AuthProvider] Ошибка загрузки профиля:', error);
      setProfile(null);
    }
  };

  // Функции аутентификации
  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await auth.signIn(email, password);
      if (user) {
        await loadProfile(user.id);
      }
    } catch (error) {
      console.error('[AuthProvider] Ошибка входа:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, metadata?: { full_name?: string }) => {
    try {
      const { user } = await auth.signUp(email, password, metadata);
      if (user) {
        await supabase.from('profiles').insert({
          user_id: user.id,
          full_name: metadata?.full_name || '',
        });
        await loadProfile(user.id);
      }
    } catch (error) {
      console.error('[AuthProvider] Ошибка регистрации:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('[AuthProvider] Ошибка выхода:', error);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');
    try {
      const updatedProfile = await auth.updateProfile(user.id, updates);
      setProfile(updatedProfile);
    } catch (error) {
      console.error('[AuthProvider] Ошибка обновления профиля:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  console.log('[AuthProvider] Возврат значения, loading:', loading);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Хук для использования контекста аутентификации
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Компонент для защиты маршрутов
export function ProtectedRoute({ children, requiredRole }: { children: ReactNode; requiredRole?: 'admin' | 'manager' | 'user' }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Можно заменить на компонент загрузки
  }

  if (!user) {
    // Перенаправляем на страницу входа, если пользователь не аутентифицирован
    window.location.href = '/login';
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Перенаправляем на страницу 403, если у пользователя нет нужной роли
    window.location.href = '/error403';
    return null;
  }

  return <>{children}</>;
} 