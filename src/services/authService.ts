
import { supabase } from '@/integrations/supabase/client';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

export const authService = {
  async login(data: LoginData): Promise<{ user: User; token: string }> {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw new Error(error.message);
    if (!authData.user) throw new Error('Login failed');

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    const user: User = {
      id: authData.user.id,
      email: authData.user.email!,
      name: profile?.name || authData.user.email!,
      avatar_url: profile?.avatar_url,
    };

    return { 
      user, 
      token: authData.session?.access_token || '' 
    };
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });

    if (error) throw new Error(error.message);
    if (!authData.user) throw new Error('Registration failed');

    const user: User = {
      id: authData.user.id,
      email: authData.user.email!,
      name: data.name,
    };

    return { 
      user, 
      token: authData.session?.access_token || '' 
    };
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  async getCurrentUser(): Promise<User | null> {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    
    if (!authUser) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    return {
      id: authUser.id,
      email: authUser.email!,
      name: profile?.name || authUser.email!,
      avatar_url: profile?.avatar_url,
    };
  }
};
