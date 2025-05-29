
import { supabase } from '@/integrations/supabase/client';

export interface UpdateOrderStatusData {
  id: string;
  status: string;
  notes?: string;
}

export interface CreateOrderData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  items: any[];
  total_amount: number;
  notes?: string;
}

export const orderService = {
  async getOrders(companyId?: string) {
    try {
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (companyId) {
        query = query.eq('company_id', companyId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  async getOrder(id: string) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  async updateOrderStatus(id: string, status: string, notes?: string) {
    try {
      // Update the order status
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status, notes })
        .eq('id', id);

      if (orderError) throw orderError;

      // Add to order history
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert({
          order_id: id,
          status,
          notes,
          changed_by: user?.id
        });

      if (historyError) {
        console.error('Error adding to order history:', historyError);
        // Don't throw here as the main update succeeded
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  async createOrder(orderData: CreateOrderData, companyId: string) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          ...orderData,
          company_id: companyId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Add initial status to history
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert({
          order_id: data.id,
          status: 'pending',
          notes: 'Pedido criado'
        });

      if (historyError) {
        console.error('Error adding initial order history:', historyError);
      }

      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
};
