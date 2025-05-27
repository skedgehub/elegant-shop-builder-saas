
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotional_price?: number;
  category_id: string;
  subcategory?: string;
  image?: string;
  badge?: string;
  stock: number;
  custom_fields: Record<string, string>;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  promotional_price?: number;
  category: string;
  subcategory?: string;
  image?: string;
  badge?: string;
  stock: number;
  customFields?: Record<string, string>;
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    
    return (data || []).map(product => ({
      ...product,
      custom_fields: product.custom_fields as Record<string, string> || {}
    }));
  },

  async getProduct(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Product not found');
    
    return {
      ...data,
      custom_fields: data.custom_fields as Record<string, string> || {}
    };
  },

  async createProduct(productData: CreateProductData): Promise<Product> {
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
          custom_fields: productData.customFields || {},
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Failed to create product');
    
    return {
      ...data,
      custom_fields: data.custom_fields as Record<string, string> || {}
    };
  },

  async updateProduct(id: string, productData: Partial<CreateProductData>): Promise<Product> {
    const updateData: any = {};
    
    if (productData.name !== undefined) updateData.name = productData.name;
    if (productData.description !== undefined) updateData.description = productData.description;
    if (productData.price !== undefined) updateData.price = productData.price;
    if (productData.promotional_price !== undefined) updateData.promotional_price = productData.promotional_price;
    if (productData.category !== undefined) updateData.category_id = productData.category;
    if (productData.subcategory !== undefined) updateData.subcategory = productData.subcategory;
    if (productData.image !== undefined) updateData.image = productData.image;
    if (productData.badge !== undefined) updateData.badge = productData.badge;
    if (productData.stock !== undefined) updateData.stock = productData.stock;
    if (productData.customFields !== undefined) updateData.custom_fields = productData.customFields;

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Failed to update product');
    
    return {
      ...data,
      custom_fields: data.custom_fields as Record<string, string> || {}
    };
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};
