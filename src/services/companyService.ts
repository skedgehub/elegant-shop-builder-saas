
import { supabase } from '@/integrations/supabase/client';

export interface CompanySettings {
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

export interface Analytics {
  total_views: number;
  total_clicks: number;
  total_orders: number;
  revenue: number;
  popular_products: Array<{
    id: string;
    name: string;
    views: number;
    clicks: number;
  }>;
}

export const companyService = {
  async getCompanySettings(companyId: string): Promise<CompanySettings | null> {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (error || !data) return null;
    return data as CompanySettings;
  },

  async updateCompanySettings(companyId: string, settings: Partial<CompanySettings>): Promise<CompanySettings> {
    const { data, error } = await supabase
      .from('companies')
      .update(settings)
      .eq('id', companyId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Failed to update company settings');
    
    return data as CompanySettings;
  },

  async getAnalytics(companyId: string, startDate?: string, endDate?: string): Promise<Analytics> {
    // Get views count
    let viewsQuery = supabase
      .from('product_views')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', companyId);

    // Get clicks count
    let clicksQuery = supabase
      .from('product_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', companyId);

    // Get orders count and revenue
    let ordersQuery = supabase
      .from('orders')
      .select('total_amount')
      .eq('company_id', companyId);

    if (startDate && endDate) {
      viewsQuery = viewsQuery.gte('created_at', startDate).lte('created_at', endDate);
      clicksQuery = clicksQuery.gte('created_at', startDate).lte('created_at', endDate);
      ordersQuery = ordersQuery.gte('created_at', startDate).lte('created_at', endDate);
    }

    const [viewsResult, clicksResult, ordersResult] = await Promise.all([
      viewsQuery,
      clicksQuery,
      ordersQuery
    ]);

    // Get popular products
    const { data: popularProductsData } = await supabase
      .from('product_views')
      .select(`
        product_id,
        products!inner(id, name),
        count
      `)
      .eq('company_id', companyId)
      .limit(5);

    const totalViews = viewsResult.count || 0;
    const totalClicks = clicksResult.count || 0;
    const orders = ordersResult.data || [];
    const totalOrders = orders.length;
    const revenue = orders.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0);

    return {
      total_views: totalViews,
      total_clicks: totalClicks,
      total_orders: totalOrders,
      revenue,
      popular_products: popularProductsData?.map(item => ({
        id: item.product_id,
        name: (item.products as any)?.name || 'Unknown',
        views: 0, // This would need a more complex query
        clicks: 0, // This would need a more complex query
      })) || [],
    };
  },

  async createOrder(companyId: string, orderData: {
    customer_name: string;
    customer_email?: string;
    customer_phone?: string;
    customer_address?: string;
    items: Array<{
      product_id: string;
      quantity: number;
      price: number;
    }>;
    total_amount: number;
    notes?: string;
  }): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .insert([{
        company_id: companyId,
        ...orderData,
      }]);

    if (error) throw new Error(error.message);
  }
};
