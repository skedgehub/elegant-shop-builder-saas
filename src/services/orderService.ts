
import { supabase } from '@/integrations/supabase/client';

export interface UpdateOrderStatusData {
  id: string;
  status: string;
  notes?: string;
}

export const orderService = {
  async updateOrderStatus({ id, status, notes }: UpdateOrderStatusData) {
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

  async createOrder(orderData: any) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
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
