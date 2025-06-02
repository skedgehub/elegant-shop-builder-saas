
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
  Package,
  Info
} from "lucide-react";
import { CatalogProduct } from "@/hooks/useCatalogData";

interface ProductDetailsModalProps {
  product: CatalogProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: CatalogProduct, quantity?: number) => void;
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
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl">
            <span className="line-clamp-2">{product.name}</span>
            <Button variant="ghost" size="sm" onClick={onClose} className="flex-shrink-0">
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Package className="h-20 w-20" />
                </div>
              )}
              
              {product.badge && (
                <Badge
                  className={`absolute top-4 left-4 ${
                    product.badge === "Oferta" ||
                    product.badge === "Promoção" ||
                    product.badge === "Liquidação"
                      ? "bg-red-500"
                      : product.badge === "Novo"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                >
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              {product.description && (
                <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
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
                  {product.rating.toFixed(1)} ({product.reviews || 0} avaliações)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-bold text-green-600">
                  R$ {price.toFixed(2).replace('.', ',')}
                </span>
                {product.promotional_price && (
                  <span className="text-2xl text-gray-500 line-through">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
              {product.promotional_price && (
                <Badge className="bg-red-500 text-white text-sm px-3 py-1">
                  Oferta especial - Economize R$ {(product.price - product.promotional_price).toFixed(2).replace('.', ',')}
                </Badge>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-lg">Quantidade:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center font-medium text-lg border rounded px-3 py-2">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700 h-12 text-lg"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button variant="outline" size="lg" className="h-12">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Stock Info */}
            {product.stock && (
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <span className="font-medium">Estoque:</span> {product.stock} unidades disponíveis
              </div>
            )}

            {/* Product Category and Subcategory */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Categoria:</span>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              {product.subcategory && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Subcategoria:</span>
                  <Badge variant="outline">{product.subcategory}</Badge>
                </div>
              )}
            </div>

            {/* Custom Fields */}
            {product.custom_fields && Object.keys(product.custom_fields).length > 0 && (
              <div className="border-t pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Info className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Informações Adicionais</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(product.custom_fields).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded-lg">
                      <dt className="text-sm font-medium text-gray-700 capitalize mb-1">
                        {key.replace(/_/g, ' ')}:
                      </dt>
                      <dd className="text-sm text-gray-900 font-medium">
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
