
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Plus,
  Minus,
  X,
  Heart,
  Share2,
  Package
} from "lucide-react";

interface ProductDetailsModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: any, quantity?: number) => void;
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
                  <Plus className="h-5 w-5 mr-2" />
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

export default ProductDetailsModal;
