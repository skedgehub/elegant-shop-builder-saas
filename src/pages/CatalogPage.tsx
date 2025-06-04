
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCatalogData, CatalogProduct } from "@/hooks/useCatalogData";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ShoppingCart,
  Package,
  Store,
  Search,
  Filter,
  Grid3X3,
  List,
  Eye,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  MapPin,
  Clock,
  Phone,
  Mail,
} from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import ProductDetailsModal from "@/components/ProductDetailsModal";

const CatalogPage = () => {
  const { subdomain } = useParams<{ subdomain: string }>();
  const { company, categories, products, isLoading } = useCatalogData(subdomain);
  const { items: cartItems, addToCart, updateQuantity: updateCartQuantity, removeFromCart, checkout: handleCheckout } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [filteredProducts, setFilteredProducts] = useState<CatalogProduct[]>([]);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Force light theme for catalog only
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    
    // Cleanup function to restore theme when leaving catalog
    return () => {
      const savedTheme = localStorage.getItem('vite-ui-theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      } else if (savedTheme === 'system') {
        document.documentElement.classList.remove('light');
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        document.documentElement.classList.add(systemTheme);
      }
    };
  }, []);

  useEffect(() => {
    if (products) {
      let filteredList = products;

      if (selectedCategory) {
        filteredList = filteredList.filter((product) => product.category === selectedCategory);
      }

      if (selectedSubcategory) {
        filteredList = filteredList.filter((product) => product.subcategory === selectedSubcategory);
      }

      if (priceRange.min !== "") {
        filteredList = filteredList.filter(
          (product) => (product.promotional_price || product.price) >= parseFloat(priceRange.min)
        );
      }

      if (priceRange.max !== "") {
        filteredList = filteredList.filter(
          (product) => (product.promotional_price || product.price) <= parseFloat(priceRange.max)
        );
      }

      if (searchTerm) {
        filteredList = filteredList.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredProducts(filteredList);
    }
  }, [products, selectedCategory, selectedSubcategory, priceRange, searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando catálogo...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          {/* Main Content */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20">
            {/* Icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                <Store className="w-16 h-16 text-gray-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Title and Description */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Catálogo Não Encontrado
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Ops! O catálogo que você está procurando não foi encontrado ou não está disponível no momento.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Possíveis Causas</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Link incorreto ou expirado</li>
                  <li>• Catálogo temporariamente indisponível</li>
                  <li>• Manutenção em andamento</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">O que fazer?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Verificar o link novamente</li>
                  <li>• Tentar mais tarde</li>
                  <li>• Contatar o responsável</li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-gray-600" />
                Precisa de Ajuda?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Se você acredita que isso é um erro, entre em contato conosco:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  suporte@exemplo.com
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  24/7 Atendimento
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                size="lg"
                className="bg-white/50 backdrop-blur-sm border-2 border-gray-300 hover:bg-white/80 transition-all duration-200"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Tentar Novamente
              </Button>
              <Button 
                onClick={() => window.location.href = '/'} 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        </div>

        {/* CSS for animations */}
        <style>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    );
  }

  const catalogData = {
    store_name: company.name,
    store_description: company.settings?.description || "Catálogo de produtos",
    categories,
    products
  };

  const ProductCard = ({ product }: { product: CatalogProduct }) => {
    const price = product.promotional_price || product.price;
    const images = product.image ? [product.image] : [];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-16 w-16 text-gray-300" />
            </div>
          )}

          {product.badge && (
            <Badge
              className={`absolute top-3 left-3 shadow-lg z-10 ${
                product.badge === "Oferta" ||
                product.badge === "Promoção" ||
                product.badge === "Liquidação"
                  ? "bg-red-500 hover:bg-red-600"
                  : product.badge === "Novo"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {product.badge}
            </Badge>
          )}

          <Button
            variant="secondary"
            size="sm"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="p-4 flex flex-col h-40">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                {product.description}
              </p>
            )}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  R$ {price.toFixed(2).replace(".", ",")}
                </span>
                {product.promotional_price && (
                  <span className="text-sm text-gray-500 line-through">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
              {product.stock && (
                <div className="flex items-center text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {product.stock} em estoque
                </div>
              )}
            </div>
          </div>
          
          {/* Always at bottom */}
          <div className="mt-auto pt-3">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const FilterSidebar = ({ className }: { className?: string }) => (
    <div className={className}>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Categorias</h3>
          <div className="space-y-2">
            <button
              onClick={() => {
                setSelectedCategory("");
                setSelectedSubcategory("");
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                !selectedCategory
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Todas as categorias
            </button>
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => {
                    setSelectedCategory(
                      selectedCategory === category.name ? "" : category.name
                    );
                    setSelectedSubcategory("");
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.name
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
                
                {/* Subcategories */}
                {selectedCategory === category.name && category.subcategories && category.subcategories.length > 0 && (
                  <div className="ml-4 mt-2 space-y-1">
                    {category.subcategories.map((sub: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedSubcategory(
                            selectedSubcategory === sub ? "" : sub
                          );
                        }}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedSubcategory === sub
                            ? "bg-primary/20 text-primary"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Faixa de Preço</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="min-price" className="text-sm text-gray-700">
                Preço mínimo
              </Label>
              <Input
                id="min-price"
                type="number"
                placeholder="R$ 0,00"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-sm text-gray-700">
                Preço máximo
              </Label>
              <Input
                id="max-price"
                type="number"
                placeholder="R$ 999,00"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
                <Store className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  {catalogData.store_name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  {catalogData.store_description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile filter button */}
              <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Filtros</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              <CartDrawer
                items={cartItems}
                onUpdateQuantity={updateCartQuantity}
                onRemoveItem={removeFromCart}
                onCheckout={handleCheckout}
                catalogData={catalogData}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Filter className="h-5 w-5 mr-2" />
                    Filtros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterSidebar />
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Search and View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600">
                  Tente alterar os filtros ou termos de busca
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="cursor-pointer"
                  >
                    {viewMode === "grid" ? (
                      <ProductCard product={product} />
                    ) : (
                      <Card className="hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              ) : (
                                <Package className="h-12 w-12 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {product.name}
                              </h3>
                              {product.description && (
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                  {product.description}
                                </p>
                              )}
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                  <span className="text-2xl font-bold text-green-600">
                                    R${" "}
                                    {(product.promotional_price || product.price)
                                      .toFixed(2)
                                      .replace(".", ",")}
                                  </span>
                                  {product.promotional_price && (
                                    <span className="text-gray-500 line-through ml-2">
                                      R$ {product.price.toFixed(2).replace(".", ",")}
                                    </span>
                                  )}
                                </div>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                  }}
                                  className="w-full sm:w-auto"
                                >
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Adicionar ao Carrinho
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default CatalogPage;
