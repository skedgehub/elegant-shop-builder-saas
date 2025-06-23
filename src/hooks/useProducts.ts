import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productService, CreateProductData } from "@/services/productService";
import { toast } from "@/hooks/use-toast";
import { $api } from "@/lib/api";

export const useProducts = (companyId?: string) => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products", companyId],
    queryFn: () => productService.getProducts(companyId),
  });

  const createProductMutation = $api.useMutation("post", "/api/v1/product", {
    onSuccess: () => {
      toast({
        title: "Upload realizado!",
        description: "O upload foi realizado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro no upload",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateProductData>;
    }) => productService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Produto atualizado!",
        description: "As alterações foram salvas.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar produto",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Produto excluído!",
        description: "O produto foi removido com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao excluir produto",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,
    createProduct: createProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    isCreating: createProductMutation.isPending,
    isUpdating: updateProductMutation.isPending,
    isDeleting: deleteProductMutation.isPending,
  };
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  });
};
