
import { supabase } from '@/integrations/supabase/client';

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_address?: string;
  items: any[];
  total_amount: number;
  status: string;
  notes?: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderData {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_address?: string;
  items: any[];
  total_amount: number;
  notes?: string;
}

export const orderService = {
  async getOrders(companyId?: string): Promise<Order[]> {
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (companyId) {
      query = query.eq('company_id', companyId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      throw new Error(error.message);
    }
    
    return data || [];
  },

  async getOrder(id: string): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Order not found');
    
    return data;
  },

  async updateOrderStatus(id: string, status: string, notes?: string): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status,
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Failed to update order');
    
    return data;
  },

  async createOrder(orderData: CreateOrderData, companyId: string): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          ...orderData,
          company_id: companyId,
          status: 'pending'
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      throw new Error(error.message);
    }
    if (!data) throw new Error('Failed to create order');
    
    return data;
  }
};
