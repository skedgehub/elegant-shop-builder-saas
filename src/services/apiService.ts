import { $api } from "@/lib/api";

// ===== TYPES =====
export interface Category {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  companyId: string | null;
  image: string | null;
  subcategories: {
    id: string;
    name: string;
    isActive: boolean;
  }[];
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  companyId: string | null;
  price: string;
  promotionalPrice: string | null;
  stock: number | null;
  categoryId: string;
  subcategoryId: string | null;
  badgeId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  image?: string;
  subcategories?: string[];
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  subcategories?: string[];
}

export interface CreateProductData {
  name: string;
  description: string | null;
  isActive: boolean;
  price: string;
  categoryId: string;
  promotionalPrice: string | null;
  stock: number | null;
  subcategoryId: string | null;
  badgeId?: string | null;
  images?: string[];
}

export interface AuthCompanySignIn {
  email: string;
  password: string;
}

export interface AuthCustomerSignIn {
  email: string;
  password: string;
}

export interface AuthCompanySignUp {
  displayName: string;
  email: string;
  phone: string;
  password: string;
  provider?: string;
  company: {
    fantasyName: string;
    legalName: string;
    cnpj: string;
    email: string;
    phone: string;
    subdomain: string;
    customDomain?: string | null;
  };
  planId: string;
}

export interface AuthCustomerSignUp {
  displayName: string;
  email: string;
  phone: string;
  password: string;
  provider?: string;
}

export interface ResetPasswordData {
  email: string;
  password: string;
}

export interface FileSignedUrlData {
  filename: string;
  contentType: string;
  ACL: "private" | "public-read" | "public-read-write" | "authenticated-read" | "aws-exec-read" | "bucket-owner-read" | "bucket-owner-full-control";
}

export interface CatalogProductsQuery {
  page?: string;
  limit?: string;
  search?: string;
  categoryId?: string;
  brandId?: string;
  priceStart?: string;
  priceEnd?: string;
  sort?: string;
}

// ===== CATEGORY SERVICES =====
export const categoryService = {
  // Criar nova categoria
  create: (data: CreateCategoryData) => 
    $api.useMutation("post", "/api/v1/category", {
      body: data
    }),

  // Atualizar categoria
  update: (categoryId: string, data: UpdateCategoryData) =>
    $api.useMutation("put", "/api/v1/category/{categoryId}", {
      params: { path: { categoryId } },
      body: data
    }),

  // Listar categorias
  list: () =>
    $api.useQuery("get", "/api/v1/categories")
};

// ===== CATALOG SERVICES =====
export const catalogService = {
  // Listar produtos do catálogo
  getProducts: (query?: CatalogProductsQuery) =>
    $api.useQuery("get", "/api/v1/catalog/products", {
      params: { query }
    }),

  // Listar categorias do catálogo
  getCategories: () =>
    $api.useQuery("get", "/api/v1/catalog/categories"),

  // Listar marcas do catálogo
  getBrands: () =>
    $api.useQuery("get", "/api/v1/catalog/brands"),

  // Configurações do catálogo
  getSettings: () =>
    $api.useQuery("get", "/api/v1/catalog/settings"),

  // Detalhes de produto do catálogo
  getProduct: (productId: string) =>
    $api.useQuery("get", "/api/v1/catalog/products/{productId}", {
      params: { path: { productId } }
    }),

  // Registrar visualização de produto
  viewProduct: (productId: string, source?: string) =>
    $api.useMutation("post", "/api/v1/catalog/products/{productId}/view", {
      params: { 
        path: { productId },
        query: source ? { source } : undefined
      }
    }),

  // Registrar clique em produto
  clickProduct: (productId: string) =>
    $api.useMutation("post", "/api/v1/catalog/products/{productId}/click", {
      params: { path: { productId } }
    }),

  // Adicionar produto ao carrinho
  addToCart: (productId: string) =>
    $api.useMutation("post", "/api/v1/catalog/products/{productId}/cart/add", {
      params: { path: { productId } }
    }),

  // Remover produto do carrinho
  removeFromCart: (productId: string) =>
    $api.useMutation("post", "/api/v1/catalog/products/{productId}/cart/remove", {
      params: { path: { productId } }
    }),

  // Produtos relacionados
  getRelatedProducts: (productId: string) =>
    $api.useQuery("get", "/api/v1/catalog/products/{productId}/related", {
      params: { path: { productId } }
    }),

  // Adicionar aos favoritos
  addToFavorites: (productId: string) =>
    $api.useMutation("post", "/api/v1/catalog/products/{productId}/favorite", {
      params: { path: { productId } }
    }),

  // Remover dos favoritos
  removeFromFavorites: (productId: string) =>
    $api.useMutation("delete", "/api/v1/catalog/products/{productId}/favorite", {
      params: { path: { productId } }
    })
};

// ===== AUTH SERVICES =====
export const authService = {
  // Login da empresa
  companySignIn: (data: AuthCompanySignIn) =>
    $api.useMutation("post", "/api/v1/auth/company/sign-in", {
      body: data
    }),

  // Login do cliente
  customerSignIn: (data: AuthCustomerSignIn) =>
    $api.useMutation("post", "/api/v1/auth/customer/sign-in", {
      body: data
    }),

  // Registro da empresa
  companySignUp: (data: AuthCompanySignUp) =>
    $api.useMutation("post", "/api/v1/auth/company/sign-up", {
      body: data
    }),

  // Registro do cliente
  customerSignUp: (data: AuthCustomerSignUp) =>
    $api.useMutation("post", "/api/v1/auth/customer/sign-up", {
      body: data
    }),

  // Reset de senha
  resetPassword: (data: ResetPasswordData) =>
    $api.useMutation("post", "/api/v1/auth/reset-password", {
      body: data
    }),

  // Recuperar senha
  recoverPassword: (data: ResetPasswordData) =>
    $api.useMutation("post", "/api/v1/auth/recover-password", {
      body: data
    }),

  // Logout
  logout: () =>
    $api.useMutation("post", "/api/v1/auth/logout")
};

// ===== USER SERVICES =====
export const userService = {
  // Dados do usuário atual
  getMe: () =>
    $api.useQuery("get", "/api/v1/user/me")
};

// ===== PRODUCT SERVICES =====
export const productService = {
  // Criar produto
  create: (data: CreateProductData) =>
    $api.useMutation("post", "/api/v1/product", {
      body: data
    })
};

// ===== FILE SERVICES =====
export const fileService = {
  // Obter URL assinada para upload
  getSignedUrl: (data: FileSignedUrlData) =>
    $api.useMutation("post", "/api/v1/file/signed-url", {
      body: data
    })
};

// ===== HEALTH CHECK =====
export const healthService = {
  // Verificar status da API
  check: () =>
    $api.useQuery("get", "/api/v1/healthcheck")
};

// ===== HOOKS CUSTOMIZADOS PARA FACILITAR O USO =====

// Hook para autenticação
export const useApiAuth = () => {
  return {
    companySignIn: authService.companySignIn,
    customerSignIn: authService.customerSignIn,
    companySignUp: authService.companySignUp,
    customerSignUp: authService.customerSignUp,
    resetPassword: authService.resetPassword,
    recoverPassword: authService.recoverPassword,
    logout: authService.logout,
    getMe: userService.getMe
  };
};

// Hook para catálogo
export const useApiCatalog = () => {
  return {
    getProducts: catalogService.getProducts,
    getCategories: catalogService.getCategories,
    getBrands: catalogService.getBrands,
    getSettings: catalogService.getSettings,
    getProduct: catalogService.getProduct,
    viewProduct: catalogService.viewProduct,
    clickProduct: catalogService.clickProduct,
    addToCart: catalogService.addToCart,
    removeFromCart: catalogService.removeFromCart,
    getRelatedProducts: catalogService.getRelatedProducts,
    addToFavorites: catalogService.addToFavorites,
    removeFromFavorites: catalogService.removeFromFavorites
  };
};

// Hook para categorias
export const useApiCategories = () => {
  return {
    create: categoryService.create,
    update: categoryService.update,
    list: categoryService.list
  };
};

// Hook para produtos
export const useApiProducts = () => {
  return {
    create: productService.create
  };
};

// Hook para arquivos
export const useApiFiles = () => {
  return {
    getSignedUrl: fileService.getSignedUrl
  };
};

// Hook para verificação de saúde
export const useApiHealth = () => {
  return {
    check: healthService.check
  };
};