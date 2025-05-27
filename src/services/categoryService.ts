
import { supabase } from '@/integrations/supabase/client';

export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  subcategories: Subcategory[];
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  image?: string;
  subcategories?: string[];
}

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    
    return (data || []).map(category => ({
      ...category,
      subcategories: Array.isArray(category.subcategories) 
        ? category.subcategories.map((sub: any, index: number) => ({
            id: index.toString(),
            name: typeof sub === 'string' ? sub : sub.name
          }))
        : []
    }));
  },

  async getCategory(id: string): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Category not found');
    
    return {
      ...data,
      subcategories: Array.isArray(data.subcategories) 
        ? data.subcategories.map((sub: any, index: number) => ({
            id: index.toString(),
            name: typeof sub === 'string' ? sub : sub.name
          }))
        : []
    };
  },

  async createCategory(categoryData: CreateCategoryData): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .insert([
        {
          name: categoryData.name,
          description: categoryData.description,
          image: categoryData.image,
          subcategories: categoryData.subcategories || [],
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Failed to create category');
    
    return {
      ...data,
      subcategories: Array.isArray(data.subcategories) 
        ? data.subcategories.map((sub: any, index: number) => ({
            id: index.toString(),
            name: typeof sub === 'string' ? sub : sub.name
          }))
        : []
    };
  },

  async updateCategory(id: string, categoryData: Partial<CreateCategoryData>): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .update({
        name: categoryData.name,
        description: categoryData.description,
        image: categoryData.image,
        subcategories: categoryData.subcategories,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Failed to update category');
    
    return {
      ...data,
      subcategories: Array.isArray(data.subcategories) 
        ? data.subcategories.map((sub: any, index: number) => ({
            id: index.toString(),
            name: typeof sub === 'string' ? sub : sub.name
          }))
        : []
    };
  },

  async deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};
