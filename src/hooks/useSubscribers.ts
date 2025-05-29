
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { subscriberService, CreateSubscriberData, UpdateSubscriberData } from '@/services/subscriberService';
import { toast } from '@/hooks/use-toast';

export const useSubscribers = () => {
  const queryClient = useQueryClient();

  const subscribersQuery = useQuery({
    queryKey: ['subscribers'],
    queryFn: () => subscriberService.getSubscribers(),
  });

  const createSubscriberMutation = useMutation({
    mutationFn: (data: CreateSubscriberData) => subscriberService.createSubscriber(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
      toast({
        title: "Assinante criado!",
        description: "O assinante foi adicionado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar assinante",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateSubscriberMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubscriberData }) =>
      subscriberService.updateSubscriber(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
      toast({
        title: "Assinante atualizado!",
        description: "As alterações foram salvas.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar assinante",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteSubscriberMutation = useMutation({
    mutationFn: subscriberService.deleteSubscriber,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
      toast({
        title: "Assinante excluído!",
        description: "O assinante foi removido com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao excluir assinante",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    subscribers: subscribersQuery.data || [],
    isLoading: subscribersQuery.isLoading,
    error: subscribersQuery.error,
    createSubscriber: createSubscriberMutation.mutate,
    updateSubscriber: updateSubscriberMutation.mutate,
    deleteSubscriber: deleteSubscriberMutation.mutate,
    isCreating: createSubscriberMutation.isPending,
    isUpdating: updateSubscriberMutation.isPending,
    isDeleting: deleteSubscriberMutation.isPending,
  };
};

export const useSubscriber = (id: string) => {
  return useQuery({
    queryKey: ['subscriber', id],
    queryFn: () => subscriberService.getSubscriber(id),
    enabled: !!id,
  });
};
