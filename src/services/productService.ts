
import { supabase } from '@/integrations/supabase/client';

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  promotional_price?: number;
  category: string;
  subcategory?: string;
  image?: string;
  badge?: string;
  stock: number;
  customFields?: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  promotional_price?: number;
  category_id: string;
  subcategory?: string;
  image?: string;
  badge?: string;
  stock: number;
  custom_fields?: Record<string, string>;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export const productService = {
  async getProducts(companyId?: string): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (companyId) {
      query = query.eq('company_id', companyId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      throw new Error(error.message);
    }
    
    return data || [];
  },

  async getProduct(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Product not found');
    
    return data;
  },

  async createProduct(productData: CreateProductData, companyId: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          promotional_price: productData.promotional_price,
          category_id: productData.category,
          subcategory: productData.subcategory,
          image: productData.image,
          badge: productData.badge,
          stock: productData.stock,
          custom_fields: productData.customFields,
          company_id: companyId,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      throw new Error(error.message);
    }
    if (!data) throw new Error('Failed to create product');
    
    return data;
  },

  async updateProduct(id: string, productData: Partial<CreateProductData>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        promotional_price: productData.promotional_price,
        category_id: productData.category,
        subcategory: productData.subcategory,
        image: productData.image,
        badge: productData.badge,
        stock: productData.stock,
        custom_fields: productData.customFields,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Failed to update product');
    
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};
