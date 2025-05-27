
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderService, CreateOrderData } from '@/services/orderService';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useOrders = (companyId?: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const ordersQuery = useQuery({
    queryKey: ['orders', companyId],
    queryFn: () => orderService.getOrders(companyId),
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: string; notes?: string }) =>
      orderService.updateOrderStatus(id, status, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Pedido atualizado!",
        description: "O status do pedido foi atualizado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar pedido",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: (data: CreateOrderData) => {
      if (!user?.company_id) throw new Error('Company ID is required');
      return orderService.createOrder(data, user.company_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Pedido criado!",
        description: "O pedido foi criado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar pedido",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    error: ordersQuery.error,
    updateOrderStatus: updateOrderStatusMutation.mutate,
    createOrder: createOrderMutation.mutate,
    isUpdating: updateOrderStatusMutation.isPending,
    isCreating: createOrderMutation.isPending,
  };
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
  });
};
