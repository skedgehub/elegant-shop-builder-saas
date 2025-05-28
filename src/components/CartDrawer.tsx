
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CheckoutForm from "@/components/CheckoutForm";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  X,
  MessageCircle
} from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, createOrder } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleOrderSubmit = async (customerData: any) => {
    const orderId = await createOrder(customerData);
    
    if (orderId) {
      const phoneNumber = "5511999999999"; // Número configurável
      let message = "🛒 *Novo Pedido*\n\n";
      
      message += `*📋 Pedido ID:* ${orderId}\n\n`;
      
      message += "*📋 Dados do Cliente:*\n";
      message += `Nome: ${customerData.name}\n`;
      message += `Telefone: ${customerData.phone}\n`;
      if (customerData.email) message += `E-mail: ${customerData.email}\n`;
      message += `Endereço: ${customerData.address}, ${customerData.city}`;
      if (customerData.state) message += ` - ${customerData.state}`;
      if (customerData.zipCode) message += ` - ${customerData.zipCode}`;
      message += "\n\n";
      
      message += "*🛍️ Produtos:*\n";
      items.forEach(item => {
        const price = item.promotionalPrice || item.price;
        message += `• ${item.name}\n`;
        message += `  Quantidade: ${item.quantity}\n`;
        message += `  Preço unitário: R$ ${price.toFixed(2)}\n`;
        message += `  Subtotal: R$ ${(price * item.quantity).toFixed(2)}\n\n`;
      });
      
      message += `💰 *Total: R$ ${getTotalPrice().toFixed(2)}*\n\n`;
      
      if (customerData.observations) {
        message += `📝 *Observações:* ${customerData.observations}\n\n`;
      }
      
      message += "Gostaria de confirmar este pedido!";
      
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      clearCart();
      setShowCheckout(false);
      onClose();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[90vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>
              {showCheckout ? "Finalizar Pedido" : "Carrinho de Compras"}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {showCheckout ? (
            <CheckoutForm
              onBack={() => setShowCheckout(false)}
              onSubmit={handleOrderSubmit}
              totalPrice={getTotalPrice()}
            />
          ) : (
            <>
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Seu carrinho está vazio</h3>
                  <p className="text-gray-600 dark:text-gray-400">Adicione produtos para começar</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded-lg" />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">IMG</span>
                          </div>
                        )}
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
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium min-w-[20px] text-center">{item.quantity}</span>
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
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {!showCheckout && items.length > 0 && (
          <div className="p-4 border-t">
            <div className="mb-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Finalizar Pedido
              </Button>
              
              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full"
              >
                Limpar Carrinho
              </Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
