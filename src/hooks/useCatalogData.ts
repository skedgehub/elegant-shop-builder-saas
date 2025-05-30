
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CatalogProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  promotional_price?: number;
  category_id: string;
  subcategory?: string;
  image?: string;
  badge?: string;
  stock: number;
  custom_fields?: Record<string, string>;
  rating?: number;
  reviews?: number;
}

export interface CatalogCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  subcategories: string[];
  count: number;
}

export const useCatalogData = (companySubdomain?: string) => {
  const categoriesQuery = useQuery({
    queryKey: ['catalog-categories', companySubdomain],
    queryFn: async () => {
      if (!companySubdomain) return [];

      // Primeiro busca a empresa pelo subdomínio
      const { data: company } = await supabase
        .from('companies')
        .select('id')
        .eq('subdomain', companySubdomain)
        .single();

      if (!company) return [];

      // Busca as categorias da empresa
      const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .eq('company_id', company.id);

      if (error) throw error;

      // Busca a contagem de produtos por categoria
      const { data: productCounts } = await supabase
        .from('products')
        .select('category_id')
        .eq('company_id', company.id);

      return categories.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description,
        image: category.image,
        subcategories: Array.isArray(category.subcategories) ? category.subcategories : [],
        count: productCounts?.filter(p => p.category_id === category.id).length || 0
      }));
    },
    enabled: !!companySubdomain,
  });

  const productsQuery = useQuery({
    queryKey: ['catalog-products', companySubdomain],
    queryFn: async () => {
      if (!companySubdomain) return [];

      // Primeiro busca a empresa pelo subdomínio
      const { data: company } = await supabase
        .from('companies')
        .select('id')
        .eq('subdomain', companySubdomain)
        .single();

      if (!company) return [];

      // Busca os produtos da empresa
      const { data: products, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id (
            name
          )
        `)
        .eq('company_id', company.id)
        .gt('stock', 0); // Só produtos em estoque

      if (error) throw error;

      return products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        promotional_price: product.promotional_price ? Number(product.promotional_price) : undefined,
        category_id: product.category_id,
        category: product.categories?.name || '',
        subcategory: product.subcategory,
        image: product.image,
        badge: product.badge,
        stock: product.stock,
        custom_fields: product.custom_fields || {},
        rating: 4.5 + Math.random() * 0.5, // Rating simulado
        reviews: Math.floor(Math.random() * 300) + 50 // Reviews simuladas
      }));
    },
    enabled: !!companySubdomain,
  });

  const searchProducts = (products: CatalogProduct[], searchTerm: string) => {
    if (!searchTerm.trim()) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.subcategory?.toLowerCase().includes(term) ||
      Object.values(product.custom_fields || {}).some(value =>
        value.toLowerCase().includes(term)
      )
    );
  };

  return {
    categories: categoriesQuery.data || [],
    products: productsQuery.data || [],
    isLoading: categoriesQuery.isLoading || productsQuery.isLoading,
    error: categoriesQuery.error || productsQuery.error,
    searchProducts,
  };
};
