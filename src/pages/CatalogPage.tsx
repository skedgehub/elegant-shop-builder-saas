
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Search, 
  ShoppingCart, 
  Star, 
  Plus,
  Minus,
  X,
  Filter,
  Grid,
  List,
  Heart,
  Share2,
  Package
} from "lucide-react";
import { useCatalogData } from "@/hooks/useCatalogData";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailsModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: any, quantity: number) => void;
}

const ProductDetailsModal = ({ product, isOpen, onClose, onAddToCart }: ProductDetailsModalProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const price = product.promotional_price || product.price;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {product.name}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Package className="h-16 w-16" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              {product.description && (
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < (product.rating || 4) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews || 0} avaliações)
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-green-600">
                  R$ {price.toFixed(2).replace('.', ',')}
                </span>
                {product.promotional_price && (
                  <span className="text-xl text-gray-500 line-through">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
              {product.promotional_price && (
                <Badge className="bg-red-500 text-white">
                  Oferta especial
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantidade:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {product.stock && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Estoque:</span> {product.stock} unidades disponíveis
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CatalogPage = () => {
  const { subdomain } = useParams();
  const { company, products, categories, isLoading } = useCatalogData(subdomain || '');
  const { items, addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleAddToCart = (product: any, quantity: number = 1) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.promotional_price || product.price,
      image: product.image,
      quantity: quantity
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
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
      {/* Header - estilo iFood */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {company.logo_url && (
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="h-12 w-auto rounded-lg"
                />
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900">{company.name}</h1>
                <p className="text-sm text-gray-600">Delivery</p>
              </div>
            </div>

            <Button
              className="relative bg-red-500 hover:bg-red-600 text-white"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Carrinho
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Search Bar - estilo iFood */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Busque por pratos ou restaurantes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 border-gray-300 rounded-full bg-gray-50 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Categories - estilo horizontal como iFood */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid - estilo cards como iFood */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600">
              Tente alterar os termos de busca ou categoria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-0 shadow-md bg-white overflow-hidden"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
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
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    {product.description && (
                      <p className="text-gray-600 text-sm line-clamp-2 leading-5">
                        {product.description}
                      </p>
                    )}

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
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">
                            {(product.rating || 4.5).toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

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
