import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  categoryService,
  CreateCategoryData,
} from "@/services/categoryService";
import { toast } from "@/hooks/use-toast";
import { $api } from "@/lib/api";

export const useCategories = (companyId?: string) => {
  const queryClient = useQueryClient();

  const categoriesQuery = $api.useQuery("get", "/api/v1/categories");

  const createCategoryMutation = $api.useMutation("post", "/api/v1/category", {
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Categoria criada!",
        description: "A categoria foi criada com sucesso.",
      });
      categoriesQuery.refetch();
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar categoria",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateCategoryData>;
    }) => categoryService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Categoria atualizada!",
        description: "As alterações foram salvas.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar categoria",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Categoria excluída!",
        description: "A categoria foi removida com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao excluir categoria",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    categories: categoriesQuery.data || [],
    isLoading: categoriesQuery.isLoading,
    error: categoriesQuery.error,
    createCategory: createCategoryMutation.mutateAsync,
    updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    isCreating: createCategoryMutation.isPending,
    isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending,
  };
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryService.getCategory(id),
    enabled: !!id,
  });
};
