
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Package,
  Star,
  Heart,
  Share2,
  Grid3X3,
  List,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import CheckoutForm from "@/components/CheckoutForm";

const CatalogPage = () => {
  const { subdomain } = useParams();
  const { addToCart, cartItems, removeFromCart, updateQuantity } = useCart();
  
  // Para demonstração, vamos usar company_id fictício
  // Em produção, você buscaria a empresa pelo subdomain
  const companyId = "demo-company-id";
  
  const { products, isLoading } = useProducts(companyId);
  const { categories } = useCategories(companyId);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filtro de busca
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filtro de categoria
      if (selectedCategory !== "all" && product.category_id !== selectedCategory) {
        return false;
      }

      // Filtro de preço
      if (priceRange !== "all") {
        const price = product.promotional_price || product.price;
        switch (priceRange) {
          case "0-50":
            if (price > 50) return false;
            break;
          case "50-100":
            if (price <= 50 || price > 100) return false;
            break;
          case "100-200":
            if (price <= 100 || price > 200) return false;
            break;
          case "200+":
            if (price <= 200) return false;
            break;
        }
      }

      return true;
    });
  }, [products, searchTerm, selectedCategory, priceRange]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartValue = () => {
    return cartItems.reduce((total, item) => {
      const price = item.promotional_price || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse p-6">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {subdomain || "Minha Loja"}
              </h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Catálogo Online
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Carrinho
                    {getTotalCartItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                        {getTotalCartItems()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Carrinho de Compras</SheetTitle>
                    <SheetDescription>
                      {getTotalCartItems()} itens no carrinho
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Seu carrinho está vazio</p>
                      </div>
                    ) : (
                      <>
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {formatPrice(item.promotional_price || item.price)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span>{formatPrice(getTotalCartValue())}</span>
                          </div>
                          <Button 
                            className="w-full mt-4" 
                            onClick={() => setShowCheckout(true)}
                            disabled={cartItems.length === 0}
                          >
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

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas as categorias" />
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

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Faixa de preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os preços</SelectItem>
                <SelectItem value="0-50">Até R$ 50</SelectItem>
                <SelectItem value="50-100">R$ 50 - R$ 100</SelectItem>
                <SelectItem value="100-200">R$ 100 - R$ 200</SelectItem>
                <SelectItem value="200+">Acima de R$ 200</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex ml-auto space-x-2">
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
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou termos de busca
            </p>
          </div>
        ) : (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              <Card 
                key={product.id}
                className={`hover:shadow-lg transition-shadow cursor-pointer ${
                  viewMode === "list" ? "flex" : ""
                }`}
                onClick={() => handleProductClick(product)}
              >
                <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className={`object-cover ${
                      viewMode === "list" 
                        ? "w-full h-32 rounded-l-lg" 
                        : "w-full h-48 rounded-t-lg"
                    }`}
                  />
                </div>
                <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    {product.badge && (
                      <Badge variant="secondary" className="ml-2">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {product.promotional_price ? (
                        <div>
                          <span className="text-lg font-bold text-green-600">
                            {formatPrice(product.promotional_price)}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {product.stock === 0 ? "Esgotado" : "Adicionar"}
                    </Button>
                  </div>
                  
                  {product.stock <= 5 && product.stock > 0 && (
                    <p className="text-xs text-orange-600 mt-2">
                      Apenas {product.stock} restantes!
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{subdomain || "Minha Loja"}</h3>
              <p className="text-gray-300 text-sm">
                Sua loja online de confiança com os melhores produtos e atendimento.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  (11) 99999-9999
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  contato@minhaloja.com
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  São Paulo, SP
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <Instagram className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
                <Facebook className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            © 2024 {subdomain || "Minha Loja"}. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductDetailsModal
        product={selectedProduct}
        open={showProductModal}
        onOpenChange={setShowProductModal}
      />

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Finalizar Pedido</DialogTitle>
            <DialogDescription>
              Complete suas informações para finalizar o pedido
            </DialogDescription>
          </DialogHeader>
          <CheckoutForm onClose={() => setShowCheckout(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CatalogPage;
