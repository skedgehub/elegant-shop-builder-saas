
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  X,
  MessageCircle
} from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

  const sendToWhatsApp = () => {
    const phoneNumber = "5511999999999"; // Número configurável
    let message = "🛒 *Pedido do Catálogo*\n\n";
    
    items.forEach(item => {
      const price = item.promotionalPrice || item.price;
      message += `• ${item.name}\n`;
      message += `  Quantidade: ${item.quantity}\n`;
      message += `  Preço: R$ ${price.toFixed(2)}\n\n`;
    });
    
    message += `💰 *Total: R$ ${getTotalPrice().toFixed(2)}*\n\n`;
    message += "Gostaria de finalizar este pedido!";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
      
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Carrinho</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="h-16 w-16 bg-gray-100 rounded-lg flex-shrink-0">
                    <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    <p className="text-sm text-green-600 font-medium">
                      R$ {(item.promotionalPrice || item.price).toFixed(2)}
                    </p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="mb-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <Button
              onClick={sendToWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Finalizar no WhatsApp
            </Button>
            
            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full mt-2"
            >
              Limpar Carrinho
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
