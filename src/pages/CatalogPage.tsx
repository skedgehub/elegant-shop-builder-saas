
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  ShoppingCart, 
  Heart,
  Star,
  Plus,
  Minus,
  X
} from "lucide-react";
import { useCatalogData } from "@/hooks/useCatalogData";
import { useCart } from "@/contexts/CartContext";
import ProductDetailsModal from "@/components/ProductDetailsModal";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotional_price?: number;
  category_id: string;
  category: any;
  subcategory?: string;
  image?: string;
  badge?: string;
  stock: number;
  custom_fields: Record<string, any>;
  rating?: number;
  reviews?: number;
}

const CatalogPage = () => {
  const { company, categories, products, isLoading } = useCatalogData();
  const { addToCart, removeFromCart, items } = useCart();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Helper function to get item quantity from cart
  const getItemQuantity = (productId: string): number => {
    const item = items.find(item => item.id === Number(productId));
    return item ? item.quantity : 0;
  };

  // Transform catalog products to match our Product interface
  const transformedProducts: Product[] = products?.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: product.price,
    promotional_price: product.promotional_price,
    category_id: product.category_id,
    category: product.category,
    subcategory: product.subcategory || '',
    image: product.image || '',
    badge: product.badge || '',
    stock: product.stock,
    custom_fields: product.custom_fields || {},
    rating: 4.5,
    reviews: 127
  })) || [];

  // Filter and sort products
  const filteredProducts = transformedProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || product.category_id === selectedCategory) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {company?.name || 'Catálogo'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <ShoppingCart className="h-4 w-4" />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-96">
                  <SheetHeader>
                    <SheetTitle>Carrinho de Compras</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {items.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Seu carrinho está vazio</p>
                    ) : (
                      <>
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeFromCart(item.id)}
                                className="h-7 w-7 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => addToCart({
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  image: item.image
                                })}
                                className="h-7 w-7 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Separator />
                        <div className="space-y-4">
                          <div className="flex justify-between items-center font-semibold">
                            <span>Total:</span>
                            <span>R$ {cartTotal.toFixed(2)}</span>
                          </div>
                          <Button className="w-full">
                            Finalizar Pedido
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Filtros</h3>
              
              {/* Categories */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-700">Categorias</h4>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-700">Faixa de Preço</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>R$ {priceRange[0]}</span>
                  <span>R$ {priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} produtos encontrados
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Ordenar por Nome</SelectItem>
                    <SelectItem value="price-low">Menor Preço</SelectItem>
                    <SelectItem value="price-high">Maior Preço</SelectItem>
                    <SelectItem value="rating">Avaliação</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex rounded-lg border">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div onClick={() => setSelectedProduct(product)}>
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.badge && (
                        <Badge className="absolute top-2 left-2">
                          {product.badge}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-1">{product.description}</p>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        {product.promotional_price ? (
                          <div className="space-y-1">
                            <span className="text-sm line-through text-gray-400">
                              R$ {product.price.toFixed(2)}
                            </span>
                            <div className="text-lg font-bold text-green-600">
                              R$ {product.promotional_price.toFixed(2)}
                            </div>
                          </div>
                        ) : (
                          <div className="text-lg font-bold">
                            R$ {product.price.toFixed(2)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getItemQuantity(product.id) > 0 ? (
                          <div className="flex items-center space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCart(Number(product.id))}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {getItemQuantity(product.id)}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => addToCart({
                                id: Number(product.id),
                                name: product.name,
                                price: product.promotional_price || product.price,
                                image: product.image
                              })}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => addToCart({
                              id: Number(product.id),
                              name: product.name,
                              price: product.promotional_price || product.price,
                              image: product.image
                            })}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => addToCart({
            id: Number(product.id),
            name: product.name,
            price: product.promotional_price || product.price,
            image: product.image
          })}
        />
      )}
    </div>
  );
};

export default CatalogPage;
