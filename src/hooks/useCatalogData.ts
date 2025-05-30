
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CatalogProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  promotional_price?: number;
  category_id: string;
  category: string;
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

export interface CompanyData {
  id: string;
  name: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  subdomain: string;
  settings?: any;
}

export const useCatalogData = (companySubdomain?: string) => {
  const companyQuery = useQuery({
    queryKey: ['company-data', companySubdomain],
    queryFn: async () => {
      if (!companySubdomain) return null;

      console.log('Fetching company data for subdomain:', companySubdomain);

      const { data: company, error } = await supabase
        .from('companies')
        .select('*')
        .eq('subdomain', companySubdomain)
        .single();

      if (error) {
        console.error('Error fetching company:', error);
        throw error;
      }

      console.log('Company data found:', company);
      return company;
    },
    enabled: !!companySubdomain,
  });

  const categoriesQuery = useQuery({
    queryKey: ['catalog-categories', companySubdomain],
    queryFn: async () => {
      if (!companySubdomain || !companyQuery.data) return [];

      console.log('Fetching categories for company:', companyQuery.data.id);

      const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .eq('company_id', companyQuery.data.id);

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      const { data: productCounts } = await supabase
        .from('products')
        .select('category_id')
        .eq('company_id', companyQuery.data.id);

      return categories.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description || '',
        image: category.image || '',
        subcategories: Array.isArray(category.subcategories) ? category.subcategories as string[] : [],
        count: productCounts?.filter(p => p.category_id === category.id).length || 0
      }));
    },
    enabled: !!companySubdomain && !!companyQuery.data,
  });

  const productsQuery = useQuery({
    queryKey: ['catalog-products', companySubdomain],
    queryFn: async () => {
      if (!companySubdomain || !companyQuery.data) return [];

      console.log('Fetching products for company:', companyQuery.data.id);

      const { data: products, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id (
            name
          )
        `)
        .eq('company_id', companyQuery.data.id)
        .gt('stock', 0);

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      console.log('Products found:', products);

      return products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: Number(product.price),
        promotional_price: product.promotional_price ? Number(product.promotional_price) : undefined,
        category_id: product.category_id || '',
        category: (product.categories as any)?.name || '',
        subcategory: product.subcategory || '',
        image: product.image || '',
        badge: product.badge || '',
        stock: product.stock,
        custom_fields: typeof product.custom_fields === 'object' && product.custom_fields !== null 
          ? product.custom_fields as Record<string, string> 
          : {},
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 300) + 50
      }));
    },
    enabled: !!companySubdomain && !!companyQuery.data,
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
        String(value).toLowerCase().includes(term)
      )
    );
  };

  return {
    company: companyQuery.data,
    categories: categoriesQuery.data || [],
    products: productsQuery.data || [],
    isLoading: companyQuery.isLoading || categoriesQuery.isLoading || productsQuery.isLoading,
    error: companyQuery.error || categoriesQuery.error || productsQuery.error,
    searchProducts,
  };
};
