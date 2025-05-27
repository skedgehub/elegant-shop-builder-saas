
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
  async getProducts(companyId?: string): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (companyId) {
      query = query.eq('company_id', companyId);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    
    return (data || []).map(product => ({
      ...product,
      custom_fields: product.custom_fields as Record<string, string> || {},
      company_id: product.company_id || ''
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
      custom_fields: data.custom_fields as Record<string, string> || {},
      company_id: data.company_id || ''
    };
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
          custom_fields: productData.customFields || {},
          company_id: companyId,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Failed to create product');
    
    return {
      ...data,
      custom_fields: data.custom_fields as Record<string, string> || {},
      company_id: data.company_id || ''
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
      custom_fields: data.custom_fields as Record<string, string> || {},
      company_id: data.company_id || ''
    };
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  },

  async trackProductView(productId: string, companyId: string, visitorId?: string): Promise<void> {
    const { error } = await supabase
      .from('product_views')
      .insert([{
        product_id: productId,
        company_id: companyId,
        visitor_id: visitorId || 'anonymous',
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      }]);

    if (error) console.error('Failed to track product view:', error);
  },

  async trackProductClick(productId: string, companyId: string, clickType: string, visitorId?: string): Promise<void> {
    const { error } = await supabase
      .from('product_clicks')
      .insert([{
        product_id: productId,
        company_id: companyId,
        click_type: clickType,
        visitor_id: visitorId || 'anonymous',
        user_agent: navigator.userAgent,
      }]);

    if (error) console.error('Failed to track product click:', error);
  }
};
