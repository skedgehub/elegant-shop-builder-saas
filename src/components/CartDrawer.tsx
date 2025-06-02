
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus,
  Trash2
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import CheckoutForm from "./CheckoutForm";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = (orderData: any) => {
    // Simulate order creation
    const orderId = Math.random().toString(36).substr(2, 9);
    
    console.log('Pedido criado:', {
      id: orderId,
      items: items,
      total: getTotalPrice(),
      customer: orderData
    });

    // Clear cart and close
    clearCart();
    setShowCheckout(false);
    onClose();

    // Show success message
    alert(`Pedido #${orderId} criado com sucesso! Entraremos em contato em breve.`);
  };

  if (showCheckout) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="h-[90vh]">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle>Finalizar Pedido</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="p-4 overflow-y-auto">
            <CheckoutForm
              onSubmit={handleCheckout}
              onBack={() => setShowCheckout(false)}
              totalPrice={getTotalPrice()}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Carrinho</span>
              {getTotalItems() > 0 && (
                <Badge className="ml-2">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
                </Badge>
              )}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-gray-600 mb-4">
                Adicione produtos para continuar com a compra
              </p>
              <Button onClick={onClose}>
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-white border rounded-lg p-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingCart className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>R$ {getTotalPrice().toFixed(2)}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="flex-1"
              >
                Limpar Carrinho
              </Button>
              <Button 
                onClick={() => setShowCheckout(true)}
                className="flex-1"
              >
                Finalizar Pedido
              </Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
