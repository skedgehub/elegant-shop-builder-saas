
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Star,
  Filter,
  Grid,
  List,
  Heart,
  Share2,
  Eye,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCatalogData, type CatalogProduct } from "@/hooks/useCatalogData";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";
import ProductDetailsModal from "@/components/ProductDetailsModal";

const CatalogPage = () => {
  const { subdomain } = useParams<{ subdomain: string }>();
  const { company, categories, products, isLoading, searchProducts } =
    useCatalogData(subdomain);
  const { addToCart, items: cartItems, isCartOpen, setIsCartOpen } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredProducts, setFilteredProducts] = useState<CatalogProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = searchProducts(products, searchTerm);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category_id === selectedCategory
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (
            (a.promotional_price || a.price) - (b.promotional_price || b.price)
          );
        case "price-high":
          return (
            (b.promotional_price || b.price) - (a.promotional_price || a.price)
          );
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy, searchProducts]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProductClick = (product: CatalogProduct) => {
    // Convert CatalogProduct to the expected format
    const productForModal = {
      id: parseInt(product.id),
      name: product.name,
      category: product.category,
      price: product.price,
      promotionalPrice: product.promotional_price,
      image: product.image || "",
      rating: product.rating || 4.5,
      reviews: product.reviews || 0,
      badge: product.badge,
      description: product.description || "",
      customFields: product.custom_fields || {},
    };
    
    setSelectedProduct(productForModal);
    setIsProductModalOpen(true);
  };

  const renderCustomFields = (customFields: Record<string, string>) => {
    if (!customFields || Object.keys(customFields).length === 0) return null;

    return (
      <div className="space-y-1">
        {Object.entries(customFields).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-600">{key}:</span>
            <span className="font-medium">{String(value)}</span>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Catálogo não encontrado
          </h1>
          <p className="text-gray-600">
            O catálogo solicitado não existe ou não está disponível.
          </p>
        </div>
      </div>
    );
  }

  const primaryColor = company.primary_color || "#3B82F6";
  const secondaryColor = company.secondary_color || "#1E40AF";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <style>
        {`
          :root {
            --primary-color: ${primaryColor};
            --secondary-color: ${secondaryColor};
          }
          .custom-primary { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); }
          .custom-primary-text { color: var(--primary-color); }
          .custom-secondary { background-color: var(--secondary-color); }
          .custom-border { border-color: var(--primary-color); }
          .custom-hover:hover { background-color: var(--secondary-color); }
        `}
      </style>

      {/* Modern Header */}
      <header className="custom-primary text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6">
              {company.logo_url && (
                <div className="relative">
                  <img
                    src={company.logo_url}
                    alt={company.name}
                    className="h-12 w-auto drop-shadow-lg"
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{company.name}</h1>
                <p className="text-white/80 text-sm">Catálogo Online</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4 text-sm text-white/90">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Delivery disponível</span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/20 relative transition-all duration-200"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="ml-2 hidden sm:inline">Carrinho</span>
                {getCartItemCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-red-500 text-white animate-pulse">
                    {getCartItemCount()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="O que você está procurando?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div className="flex gap-3">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full lg:w-48 h-12 rounded-xl border-gray-200">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48 h-12 rounded-xl border-gray-200">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nome</SelectItem>
                    <SelectItem value="price-low">Menor preço</SelectItem>
                    <SelectItem value="price-high">Maior preço</SelectItem>
                    <SelectItem value="rating">Avaliação</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none h-12 px-4"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none h-12 px-4"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories and Products Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-white rounded-xl shadow-sm">
            <TabsTrigger value="products" className="rounded-lg text-base">
              Produtos ({filteredProducts.length})
            </TabsTrigger>
            <TabsTrigger value="categories" className="rounded-lg text-base">
              Categorias ({categories.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg rounded-2xl overflow-hidden group"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-0">
                    {category.image && (
                      <div className="relative overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-gray-600 text-sm mb-3">
                          {category.description}
                        </p>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {category.count} produtos
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-gray-600">
                    Tente ajustar os filtros ou termos de busca
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    : "space-y-6"
                }
              >
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg rounded-2xl group cursor-pointer"
                  >
                    <div className="relative">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className={
                            viewMode === "grid"
                              ? "w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                              : "w-40 h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                          }
                        />
                      ) : (
                        <div className={
                          viewMode === "grid"
                            ? "w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                            : "w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                        }>
                          <span className="text-gray-500 text-sm">Sem imagem</span>
                        </div>
                      )}
                      
                      {product.badge && (
                        <Badge className="absolute top-3 left-3 custom-primary shadow-lg">
                          {product.badge}
                        </Badge>
                      )}
                      
                      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-9 w-9 p-0 bg-white/90 hover:bg-white shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-9 w-9 p-0 bg-white/90 hover:bg-white shadow-lg"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-6" onClick={() => handleProductClick(product)}>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{product.rating?.toFixed(1) || "0.0"}</span>
                        </div>
                      </div>

                      {product.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {renderCustomFields(product.custom_fields || {})}

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex flex-col">
                          {product.promotional_price &&
                          product.promotional_price < product.price ? (
                            <>
                              <span className="text-2xl font-bold custom-primary-text">
                                {formatPrice(product.promotional_price)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold custom-primary-text">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>

                        <Badge variant="outline" className="text-xs">
                          Estoque: {product.stock}
                        </Badge>
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      <Button
                        className="w-full custom-primary custom-hover text-white font-semibold h-12 rounded-xl transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.promotional_price || product.price,
                            image: product.image,
                            stock: product.stock,
                          });
                        }}
                        disabled={product.stock <= 0}
                      >
                        {product.stock <= 0
                          ? "Fora de estoque"
                          : "Adicionar ao carrinho"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              {company.logo_url && (
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="h-12 w-auto mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-2">{company.name}</h3>
              <p className="text-gray-400">
                Catálogo online com os melhores produtos
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contato@{company.name.toLowerCase()}.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <div className="space-y-1">
                {categories.slice(0, 5).map((category) => (
                  <button
                    key={category.id}
                    className="block text-gray-400 hover:text-white transition-colors"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 {company.name}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        companyId={company?.id || ""}
      />

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
};

export default CatalogPage;
