
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { orderService, CreateOrderData } from '@/services/orderService';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  promotionalPrice?: number;
  image: string;
  quantity: number;
  customFields: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  createOrder: (customerData: any, companyId: string) => Promise<string | null>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        promotionalPrice: product.promotionalPrice,
        image: product.image,
        quantity: 1,
        customFields: product.customFields || {}
      }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = item.promotionalPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const createOrder = async (customerData: any, companyId: string): Promise<string | null> => {
    try {
      if (!companyId) {
        throw new Error('Company ID is required');
      }

      const orderItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.promotionalPrice || item.price,
        quantity: item.quantity,
        customFields: item.customFields
      }));

      const orderData: CreateOrderData = {
        customer_name: customerData.name,
        customer_email: customerData.email,
        customer_phone: customerData.phone,
        customer_address: `${customerData.address}, ${customerData.city}${customerData.state ? ` - ${customerData.state}` : ''}${customerData.zipCode ? ` - ${customerData.zipCode}` : ''}`,
        items: orderItems,
        total_amount: getTotalPrice(),
        notes: customerData.observations
      };

      const order = await orderService.createOrder(orderData, companyId);
      
      toast({
        title: "Pedido criado!",
        description: "Seu pedido foi registrado com sucesso.",
      });

      return order.id;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Erro ao criar pedido",
        description: "Não foi possível registrar o pedido.",
        variant: "destructive",
      });
      return null;
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      createOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};
