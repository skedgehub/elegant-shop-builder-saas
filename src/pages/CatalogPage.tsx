
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  ShoppingCart, 
  Star, 
  Plus,
  Grid,
  List,
  Heart,
  SlidersHorizontal,
  ChevronDown,
  Package,
  X
} from "lucide-react";
import { useCatalogData } from "@/hooks/useCatalogData";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";
import ProductDetailsModal from "@/components/ProductDetailsModal";

const CatalogPage = () => {
  const { subdomain } = useParams();
  const { company, products, categories, isLoading } = useCatalogData(subdomain || '');
  const { items, addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || product.category_id === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.promotional_price || a.price) - (b.promotional_price || b.price);
      case 'price-high':
        return (b.promotional_price || b.price) - (a.promotional_price || a.price);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.promotional_price || product.price,
      image: product.image,
      quantity: 1
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Catálogo não encontrado
          </h1>
          <p className="text-gray-600">
            O catálogo que você está procurando não existe ou não está disponível.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {company.logo_url && (
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="h-10 w-auto"
                />
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900">{company.name}</h1>
                <p className="text-sm text-gray-500">Catálogo</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Button
                variant="outline"
                onClick={() => setShowCartDrawer(true)}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Carrinho
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar de Filtros */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filtros</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Categorias */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Categoria</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "all"}
                    onChange={() => setSelectedCategory("all")}
                    className="mr-2"
                  />
                  <span className="text-sm">Todos</span>
                </label>
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.id}
                      onChange={() => setSelectedCategory(category.id)}
                      className="mr-2"
                    />
                    <span className="text-sm">{category.name}</span>
                    <span className="text-xs text-gray-500 ml-auto">({category.count})</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Faixa de Preço */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Preço</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20 h-8 text-xs"
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20 h-8 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>

                  <span className="text-sm text-gray-600">
                    {sortedProducts.length} produtos encontrados
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Ordenar por:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="popular">Mais Popular</option>
                      <option value="price-low">Menor Preço</option>
                      <option value="price-high">Maior Preço</option>
                      <option value="name">Nome A-Z</option>
                    </select>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid de Produtos */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600">
                  Tente alterar os filtros ou termos de busca
                </p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }>
                {sortedProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className={`group cursor-pointer transition-all duration-300 hover:shadow-lg bg-white overflow-hidden ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div 
                      className={`${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'} bg-gray-100 overflow-hidden relative`}
                      onClick={() => handleProductClick(product)}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Package className="h-12 w-12" />
                        </div>
                      )}
                      {product.promotional_price && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                          Oferta
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent className={`${viewMode === 'list' ? 'flex-1' : ''} p-4`}>
                      <div className="space-y-3">
                        <div onClick={() => handleProductClick(product)}>
                          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                            {product.name}
                          </h3>
                          
                          {product.description && (
                            <p className="text-gray-600 text-sm line-clamp-2 leading-5">
                              {product.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (product.rating || 4) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">
                            ({product.reviews || 0})
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-gray-900">
                                R$ {(product.promotional_price || product.price).toFixed(2).replace('.', ',')}
                              </span>
                              {product.promotional_price && (
                                <span className="text-sm text-gray-500 line-through">
                                  R$ {product.price.toFixed(2).replace('.', ',')}
                                </span>
                              )}
                            </div>
                            {product.promotional_price && (
                              <span className="text-xs text-red-600 font-medium">
                                Economize R$ {(product.price - product.promotional_price).toFixed(2).replace('.', ',')}
                              </span>
                            )}
                          </div>

                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Adicionar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Carrinho Drawer */}
      <CartDrawer
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
        companyId={company?.id}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default CatalogPage;
