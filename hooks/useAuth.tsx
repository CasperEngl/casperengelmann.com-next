import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient, Provider, Session, User } from '@supabase/supabase-js';
import { setTimeout } from 'timers';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY, {
  persistSession: true,
});

type UserData = {
  session: Session | null;
  user: User | null;
  provider?: Provider;
  url?: string | null;
  error: Error | null;
};

export type EntryProviderType = {
  provider: 'google' | 'github';
  email?: null;
  password?: null;
  method?: null;
};

export type EntryEmailType = {
  email: string;
  password: string;
  method: 'signIn' | 'signUp';
  provider?: null;
};

// @ts-ignore
const authContext = createContext<{
  user: User | Session | null;
  loading: boolean;
  error: string | null;
  entryMethod({ provider }: EntryProviderType): Promise<UserData>;
  entryMethod({ email, password }: EntryEmailType): Promise<UserData>;
  handleEntry({ method, email, password }: EntryEmailType): Promise<void>;
  signOut(): Promise<void>;
}>();

export const useAuthProvider = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | Session>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const handleUser = (data: UserData) => {
    const { user, error, session } = data;

    if (error) {
      setError(error.message);
      setUser(null);
    } else if (user) {
      setUser(user);
      setError(null);
    } else {
      setUser(session);
    }

    console.log({ user });
  };

  function entryMethod({ email, password, method }: EntryEmailType): Promise<UserData>;
  function entryMethod({ provider }: EntryProviderType): Promise<UserData>;
  async function entryMethod({
    email,
    password,
    provider,
    method,
  }: EntryEmailType | EntryProviderType): Promise<UserData> {
    if (typeof provider === 'undefined') {
      const { data: session, ...rest } = await supabase.auth[method]({
        email,
        password,
      });

      handleUser({ session, ...rest });

      return { session, ...rest };
    } else {
      const { data: session, ...rest } = await supabase.auth.signIn({
        provider,
      });

      handleUser({ session, ...rest });

      return { session, ...rest };
    }
  }

  const signOut = async () => {
    setLoading(true);

    await supabase.auth.signOut();

    setLoading(false);
  };

  const handleEntry = async ({ method, email, password }: EntryEmailType) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const data = await entryMethod({ method, email, password });

    handleUser(data);

    setLoading(false);
  };

  useEffect(() => {
    if (user && ['/login', '/register'].some((route) => router.route === route)) {
      router.push('/');
    }
  }, [user, router.route]);

  useEffect(() => {
    const session = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          setUser(session.user);
          break;
        case 'SIGNED_OUT':
          setUser(null);
          break;
        case 'USER_UPDATED':
          break;
        case 'PASSWORD_RECOVERY':
          break;
      }
    });

    return () => session.data.unsubscribe();
  }, []);

  return {
    user: loading ? null : user,
    error: loading ? null : error,
    loading: user ? false : loading,
    entryMethod,
    signOut,
    handleEntry,
  };
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
