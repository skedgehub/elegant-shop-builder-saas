
import api from './api';

export interface CatalogSettings {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
  subdomain: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCatalogData {
  name?: string;
  description?: string;
  logo?: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  subdomain?: string;
}

// Dados mockados
let mockCatalog: CatalogSettings = {
  id: '1',
  name: 'Minha Loja Virtual',
  description: 'A melhor loja online da região',
  logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop',
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937'
  },
  subdomain: 'minhaloja',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const catalogService = {
  async getCatalogSettings(): Promise<CatalogSettings> {
    await delay(500);
    return mockCatalog;
  },

  async updateCatalogSettings(data: UpdateCatalogData): Promise<CatalogSettings> {
    await delay(800);
    
    mockCatalog = {
      ...mockCatalog,
      ...data,
      theme: data.theme ? { ...mockCatalog.theme, ...data.theme } : mockCatalog.theme,
      updatedAt: new Date().toISOString()
    };
    
    return mockCatalog;
  },

  async toggleCatalogStatus(): Promise<CatalogSettings> {
    await delay(300);
    
    mockCatalog = {
      ...mockCatalog,
      isActive: !mockCatalog.isActive,
      updatedAt: new Date().toISOString()
    };
    
    return mockCatalog;
  }
};
