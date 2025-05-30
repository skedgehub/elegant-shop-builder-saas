
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Star, ShoppingCart, Filter, Grid, List, Menu } from "lucide-react";
import { useCatalogData } from "@/hooks/useCatalogData";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";

const CatalogPage = () => {
  const { subdomain } = useParams();
  const { company, categories, products, isLoading, searchProducts } = useCatalogData(subdomain);
  const { addToCart, getTotalItems } = useCart();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let filtered = products;
    
    if (searchTerm) {
      filtered = searchProducts(filtered, searchTerm);
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category_id === selectedCategory);
    }
    
    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedSubcategory, searchProducts]);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.promotional_price || product.price,
      image: product.image,
      quantity: 1
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Catálogo não encontrado</h1>
          <p className="text-gray-600">O catálogo solicitado não foi encontrado.</p>
        </div>
      </div>
    );
  }

  const primaryColor = company.primary_color || '#3B82F6';
  const secondaryColor = company.secondary_color || '#1E40AF';

  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          :root {
            --primary-color: ${primaryColor};
            --secondary-color: ${secondaryColor};
          }
          .theme-primary { color: var(--primary-color); }
          .theme-bg-primary { background-color: var(--primary-color); }
          .theme-border-primary { border-color: var(--primary-color); }
        `}
      </style>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              {company.logo_url ? (
                <img 
                  src={company.logo_url} 
                  alt={company.name}
                  className="h-10 w-auto"
                />
              ) : (
                <h1 className="text-2xl font-bold theme-primary">
                  {company.name}
                </h1>
              )}
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "theme-bg-primary text-white" : ""}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "theme-bg-primary text-white" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Cart Button */}
              <Button
                onClick={() => setIsCartOpen(true)}
                className="theme-bg-primary text-white hover:opacity-90 relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Carrinho
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`w-64 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </h3>
              
              {/* Categories Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Categorias</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setSelectedSubcategory("");
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      !selectedCategory ? "theme-bg-primary text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    Todas ({products.length})
                  </button>
                  {categories.map(category => (
                    <div key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedSubcategory("");
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          selectedCategory === category.id ? "theme-bg-primary text-white" : "hover:bg-gray-100"
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                      
                      {/* Subcategories */}
                      {selectedCategory === category.id && category.subcategories.length > 0 && (
                        <div className="ml-4 mt-2 space-y-1">
                          {category.subcategories.map(subcategory => (
                            <button
                              key={subcategory}
                              onClick={() => setSelectedSubcategory(subcategory)}
                              className={`w-full text-left px-3 py-1 rounded-md text-xs ${
                                selectedSubcategory === subcategory ? "bg-blue-100 theme-primary" : "hover:bg-gray-50"
                              }`}
                            >
                              {subcategory}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredProducts.length} produto(s) encontrado(s)
                </h2>
                {searchTerm && (
                  <p className="text-sm text-gray-600">
                    Resultados para "{searchTerm}"
                  </p>
                )}
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
                <p className="text-gray-400 text-sm mt-2">
                  Tente ajustar os filtros ou buscar por outros termos
                </p>
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-4"
              }>
                {filteredProducts.map(product => (
                  <Card key={product.id} className={viewMode === "list" ? "flex" : ""}>
                    <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span>Sem imagem</span>
                          </div>
                        )}
                        {product.badge && (
                          <Badge className="absolute top-2 left-2 bg-red-500">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="space-y-2">
                        <h3 className="font-medium text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                        
                        {product.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating || 0)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            ({product.reviews || 0})
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          {product.promotional_price ? (
                            <>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-green-600">
                                  {formatPrice(product.promotional_price)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(product.price)}
                                </span>
                              </div>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                        
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full theme-bg-primary text-white hover:opacity-90"
                          size="sm"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Adicionar ao Carrinho
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        companyId={company?.id}
      />
    </div>
  );
};

export default CatalogPage;
