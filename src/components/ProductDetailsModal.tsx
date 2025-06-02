
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  Plus,
  Minus,
  X,
  Heart,
  Share2,
  Package,
  Info,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('details');

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const price = product.promotional_price || product.price;
  const images = product.image ? [product.image] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden bg-white p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-900 line-clamp-1">
                    {product.name}
                  </DialogTitle>
                  <p className="text-sm text-gray-600">Detalhes do produto</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto">
            <div className="grid lg:grid-cols-2 gap-8 p-6">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative group">
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
                            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            onClick={prevImage}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            onClick={nextImage}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Package className="h-24 w-24" />
                    </div>
                  )}
                  
                  {product.badge && (
                    <Badge
                      className={`absolute top-4 left-4 shadow-lg ${
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
                </div>

                {images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex
                            ? 'border-blue-500'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      {product.subcategory && (
                        <Badge variant="secondary" className="text-xs">
                          {product.subcategory}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {product.description && (
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  )}

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
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
                        <span className="font-medium text-gray-900">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.reviews || 0} avaliações)
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-bold text-green-600">
                      R$ {price.toFixed(2).replace('.', ',')}
                    </span>
                    {product.promotional_price && (
                      <div className="space-y-1">
                        <span className="text-xl text-gray-500 line-through">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        <Badge className="bg-red-500 text-white text-xs">
                          Economize R$ {(product.price - product.promotional_price).toFixed(2).replace('.', ',')}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  {product.stock && (
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">
                        {product.stock} unidades em estoque
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Quantity and Actions */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900">Quantidade:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-10 w-10 rounded-l-lg rounded-r-none"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="w-16 h-10 flex items-center justify-center font-medium border-x border-gray-300">
                        {quantity}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-10 w-10 rounded-r-lg rounded-l-none"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={handleAddToCart}
                      className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-medium"
                      size="lg"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Adicionar ao Carrinho - R$ {(price * quantity).toFixed(2).replace('.', ',')}
                    </Button>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Card className="p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-0">
                          <Truck className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600 font-medium">Entrega Rápida</p>
                        </CardContent>
                      </Card>
                      <Card className="p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-0">
                          <Shield className="h-5 w-5 text-green-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600 font-medium">Compra Segura</p>
                        </CardContent>
                      </Card>
                      <Card className="p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-0">
                          <RotateCcw className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                          <p className="text-xs text-gray-600 font-medium">Troca Grátis</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Additional Information Tabs */}
                {product.custom_fields && Object.keys(product.custom_fields).length > 0 && (
                  <div className="space-y-4">
                    <div className="flex space-x-4 border-b">
                      <button
                        onClick={() => setActiveTab('details')}
                        className={`pb-2 px-1 border-b-2 transition-colors ${
                          activeTab === 'details'
                            ? 'border-blue-500 text-blue-600 font-medium'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Detalhes
                      </button>
                      <button
                        onClick={() => setActiveTab('specs')}
                        className={`pb-2 px-1 border-b-2 transition-colors ${
                          activeTab === 'specs'
                            ? 'border-blue-500 text-blue-600 font-medium'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Especificações
                      </button>
                    </div>

                    <div className="space-y-3">
                      {activeTab === 'details' && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Info className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-gray-900">Informações Adicionais</h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {Object.entries(product.custom_fields).map(([key, value]) => (
                              <Card key={key} className="border border-gray-200">
                                <CardContent className="p-4">
                                  <dt className="text-sm font-medium text-gray-700 capitalize mb-2">
                                    {key.replace(/_/g, ' ')}
                                  </dt>
                                  <dd className="text-sm text-gray-900 font-medium">
                                    {String(value)}
                                  </dd>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'specs' && (
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900">Especificações Técnicas</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Categoria</span>
                              <span className="font-medium">{product.category}</span>
                            </div>
                            {product.subcategory && (
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Subcategoria</span>
                                <span className="font-medium">{product.subcategory}</span>
                              </div>
                            )}
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Estoque</span>
                              <span className="font-medium">{product.stock} unidades</span>
                            </div>
                            {Object.entries(product.custom_fields || {}).map(([key, value]) => (
                              <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600 capitalize">
                                  {key.replace(/_/g, ' ')}
                                </span>
                                <span className="font-medium">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
