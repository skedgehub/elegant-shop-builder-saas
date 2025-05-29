
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  status: string;
  notes?: string;
  changed_by?: string;
  created_at: string;
}

export const useOrderHistory = (orderId?: string) => {
  const [history, setHistory] = useState<OrderStatusHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderHistory = async () => {
    if (!orderId) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('order_status_history')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error: any) {
      console.error('Error fetching order history:', error);
      toast({
        title: "Erro ao carregar histórico",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToHistory = async (status: string, notes?: string) => {
    if (!orderId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          status,
          notes,
          changed_by: user?.id
        });

      if (error) throw error;
      
      // Refresh history
      fetchOrderHistory();
    } catch (error: any) {
      console.error('Error adding to order history:', error);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, [orderId]);

  return {
    history,
    isLoading,
    addToHistory,
    refetch: fetchOrderHistory,
  };
};
