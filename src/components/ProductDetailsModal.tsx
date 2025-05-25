
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  ShoppingCart, 
  Heart, 
  Star, 
  Plus, 
  Minus,
  Share2,
  MessageCircle
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  promotionalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  customFields: Record<string, string>;
}

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal = ({ product, isOpen, onClose }: ProductDetailsModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  const shareProduct = () => {
    const text = `Confira este produto: ${product.name} - R$ ${(product.promotionalPrice || product.price).toFixed(2)}`;
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${text} - ${window.location.href}`);
    }
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "5511999999999";
    const price = product.promotionalPrice || product.price;
    const message = `Olá! Tenho interesse neste produto:\n\n*${product.name}*\nPreço: R$ ${price.toFixed(2)}\n\nPoderia me dar mais informações?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold truncate">{product.name}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Imagem do Produto</span>
              </div>
              
              {product.badge && (
                <Badge 
                  className={`absolute top-2 left-2 ${
                    product.badge === "Oferta" || product.badge === "Promoção" || product.badge === "Liquidação" 
                      ? "bg-red-500" 
                      : product.badge === "Novo" 
                      ? "bg-green-500" 
                      : "bg-blue-500"
                  }`}
                >
                  {product.badge}
                </Badge>
              )}
              
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button size="sm" variant="secondary" onClick={shareProduct}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>

              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} avaliações)</span>
              </div>

              <div className="space-y-2">
                {product.promotionalPrice ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-green-600">
                      R$ {product.promotionalPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    R$ {product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Custom Fields */}
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(product.customFields).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-600 capitalize font-medium">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantidade:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <Button onClick={handleAddToCart} className="w-full" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                
                <Button 
                  onClick={sendToWhatsApp}
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Consultar no WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
