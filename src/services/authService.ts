
import api from './api';

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
  avatar?: string;
}

// Simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(data: LoginData): Promise<{ user: User; token: string }> {
    await delay(1000);
    
    // Simular validação
    if (data.email === 'admin@test.com' && data.password === '123456') {
      const user = {
        id: '1',
        email: data.email,
        name: 'Admin User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
      const token = 'fake-jwt-token-' + Date.now();
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    } else {
      throw new Error('Credenciais inválidas');
    }
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    await delay(1000);
    
    const user = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
    };
    const token = 'fake-jwt-token-' + Date.now();
    
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user, token };
  },

  async logout(): Promise<void> {
    await delay(500);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(300);
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};
