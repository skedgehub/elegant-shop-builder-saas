
import api from './api';

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  subcategories: Subcategory[];
  createdAt: string;
  updatedAt: string;
}

export interface Subcategory {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  image?: string;
  subcategories?: string[];
}

// Dados mockados
let mockCategories: Category[] = [
  {
    id: '1',
    name: 'Eletrônicos',
    description: 'Produtos eletrônicos em geral',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=400&fit=crop',
    subcategories: [
      { id: '1', name: 'Smartphones', categoryId: '1' },
      { id: '2', name: 'Notebooks', categoryId: '1' },
      { id: '3', name: 'Fones de Ouvido', categoryId: '1' }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Calçados',
    description: 'Sapatos, tênis e sandálias',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    subcategories: [
      { id: '4', name: 'Esportivos', categoryId: '2' },
      { id: '5', name: 'Sociais', categoryId: '2' },
      { id: '6', name: 'Casuais', categoryId: '2' }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    await delay(600);
    return mockCategories;
  },

  async getCategory(id: string): Promise<Category | null> {
    await delay(400);
    return mockCategories.find(c => c.id === id) || null;
  },

  async createCategory(data: CreateCategoryData): Promise<Category> {
    await delay(800);
    
    const categoryId = Date.now().toString();
    const category: Category = {
      id: categoryId,
      name: data.name,
      description: data.description,
      image: data.image,
      subcategories: data.subcategories?.map((name, index) => ({
        id: (Date.now() + index).toString(),
        name,
        categoryId: categoryId
      })) || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockCategories.push(category);
    return category;
  },

  async updateCategory(id: string, data: Partial<CreateCategoryData>): Promise<Category> {
    await delay(700);
    
    const index = mockCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Categoria não encontrada');
    
    const updatedCategory: Category = {
      ...mockCategories[index],
      ...data,
      subcategories: data.subcategories 
        ? data.subcategories.map((name, subIndex) => ({
            id: (Date.now() + subIndex).toString(),
            name,
            categoryId: id
          }))
        : mockCategories[index].subcategories,
      updatedAt: new Date().toISOString()
    };
    
    mockCategories[index] = updatedCategory;
    return updatedCategory;
  },

  async deleteCategory(id: string): Promise<void> {
    await delay(500);
    
    const index = mockCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Categoria não encontrada');
    
    mockCategories.splice(index, 1);
  }
};
