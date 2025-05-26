
import api from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  subcategory?: string;
  status: 'active' | 'inactive';
  customFields: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  subcategory?: string;
  customFields?: Record<string, any>;
}

// Dados mockados
let mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Galaxy',
    description: 'Smartphone Android com 128GB',
    price: 1299.00,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'eletronicos',
    subcategory: 'smartphones',
    status: 'active',
    customFields: { marca: 'Samsung', modelo: 'Galaxy S21' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Tênis Nike Air',
    description: 'Tênis esportivo confortável',
    price: 599.00,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    category: 'calcados',
    subcategory: 'esportivos',
    status: 'active',
    customFields: { marca: 'Nike', tamanho: '42' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getProducts(): Promise<Product[]> {
    await delay(800);
    return mockProducts;
  },

  async getProduct(id: string): Promise<Product | null> {
    await delay(500);
    return mockProducts.find(p => p.id === id) || null;
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    await delay(1000);
    
    const product: Product = {
      id: Date.now().toString(),
      ...data,
      status: 'active',
      customFields: data.customFields || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockProducts.push(product);
    return product;
  },

  async updateProduct(id: string, data: Partial<CreateProductData>): Promise<Product> {
    await delay(800);
    
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Produto não encontrado');
    
    mockProducts[index] = {
      ...mockProducts[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    return mockProducts[index];
  },

  async deleteProduct(id: string): Promise<void> {
    await delay(600);
    
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Produto não encontrado');
    
    mockProducts.splice(index, 1);
  }
};
