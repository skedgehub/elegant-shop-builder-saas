
import { supabase } from '@/integrations/supabase/client';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  subdomain?: string;
  companyName?: string;
  selectedPlan?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  company_id?: string;
  role?: string;
}

export interface Company {
  id: string;
  name: string;
  subdomain: string;
  custom_domain?: string;
  plan: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  settings?: Record<string, any>;
}

export const authService = {
  async login(data: LoginData): Promise<{ user: User; token: string }> {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw new Error(error.message);
    if (!authData.user) throw new Error('Login failed');

    // Get user profile with company info
    const { data: profile } = await supabase
      .from('profiles')
      .select(`
        *,
        companies (*)
      `)
      .eq('id', authData.user.id)
      .single();

    const user: User = {
      id: authData.user.id,
      email: authData.user.email!,
      name: profile?.name || authData.user.email!,
      avatar_url: profile?.avatar_url,
      company_id: profile?.company_id,
      role: profile?.role,
    };

    return { 
      user, 
      token: authData.session?.access_token || '' 
    };
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    const userData: any = {
      name: data.name,
    };

    // If registering as company admin, include company data
    if (data.subdomain) {
      userData.subdomain = data.subdomain;
      userData.companyName = data.companyName;
      userData.selectedPlan = data.selectedPlan;
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: userData,
      },
    });

    if (error) throw new Error(error.message);
    if (!authData.user) throw new Error('Registration failed');

    const user: User = {
      id: authData.user.id,
      email: authData.user.email!,
      name: data.name,
      role: data.subdomain ? 'admin' : 'user',
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
      .select(`
        *,
        companies (*)
      `)
      .eq('id', authUser.id)
      .single();

    return {
      id: authUser.id,
      email: authUser.email!,
      name: profile?.name || authUser.email!,
      avatar_url: profile?.avatar_url,
      company_id: profile?.company_id,
      role: profile?.role,
    };
  },

  async getCompany(companyId: string): Promise<Company | null> {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (error || !data) return null;
    return data as Company;
  },

  async updateCompany(companyId: string, updates: Partial<Company>): Promise<Company> {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', companyId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Failed to update company');
    
    return data as Company;
  }
};
