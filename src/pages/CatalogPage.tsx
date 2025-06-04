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
} from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import ProductDetailsModal from "@/components/ProductDetailsModal";

const CatalogPage = () => {
  const { subdomain } = useParams<{ subdomain: string }>();
  const { catalogData, isLoading } = useCatalogData(subdomain);
  const { cartItems, addToCart, updateCartQuantity, removeFromCart, handleCheckout } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<CatalogProduct[]>([]);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (catalogData) {
      setCategories(catalogData.categories || []);
    }
  }, [catalogData]);

  useEffect(() => {
    if (catalogData) {
      let products = catalogData.products || [];

      if (selectedCategory) {
        products = products.filter((product) => product.category === selectedCategory);
      }

      if (selectedSubcategory) {
        products = products.filter((product) => product.subcategory === selectedSubcategory);
      }

      if (priceRange.min !== "") {
        products = products.filter(
          (product) => (product.promotional_price || product.price) >= parseFloat(priceRange.min)
        );
      }

      if (priceRange.max !== "") {
        products = products.filter(
          (product) => (product.promotional_price || product.price) <= parseFloat(priceRange.max)
        );
      }

      if (searchTerm) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredProducts(products);
    }
  }, [catalogData, selectedCategory, selectedSubcategory, priceRange, searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!catalogData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
            <Store className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Catálogo não encontrado
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            O catálogo que você está procurando não foi encontrado ou não está disponível no momento.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Possíveis motivos:</h3>
              <ul className="text-left text-gray-600 space-y-1 text-sm">
                <li>• O link pode estar incorreto</li>
                <li>• O catálogo pode ter sido removido</li>
                <li>• Pode haver uma manutenção temporária</li>
              </ul>
            </div>
            <Button 
              onClick={() => window.location.href = '/'} 
              className="w-full"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const ProductCard = ({ product }: { product: CatalogProduct }) => {
    const price = product.promotional_price || product.price;
    const images = product.images || (product.image ? [product.image] : []);
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
                    {category.subcategories.map((sub, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedSubcategory(
                            selectedSubcategory === sub.name ? "" : sub.name
                          );
                        }}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedSubcategory === sub.name
                            ? "bg-primary/20 text-primary"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {sub.name}
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
