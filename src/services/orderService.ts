
import api from './api';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'pix' | 'credit_card' | 'cash';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    productId: string;
    quantity: number;
  }[];
  paymentMethod: 'pix' | 'credit_card' | 'cash';
  notes?: string;
}

// Dados mockados
let mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'João Silva',
    customerEmail: 'joao@email.com',
    customerPhone: '(11) 99999-9999',
    customerAddress: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'iPhone 15 Pro',
        productImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
        quantity: 1,
        unitPrice: 8999.99,
        totalPrice: 8999.99
      }
    ],
    total: 8999.99,
    status: 'pending',
    paymentMethod: 'pix',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const orderService = {
  async getOrders(): Promise<Order[]> {
    await delay(600);
    return mockOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getOrder(id: string): Promise<Order | null> {
    await delay(400);
    return mockOrders.find(o => o.id === id) || null;
  },

  async createOrder(data: CreateOrderData): Promise<Order> {
    await delay(1000);
    
    // Simular busca de produtos para calcular preços
    const items: OrderItem[] = data.items.map((item, index) => ({
      id: (Date.now() + index).toString(),
      productId: item.productId,
      productName: `Produto ${item.productId}`,
      productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      quantity: item.quantity,
      unitPrice: 99.99,
      totalPrice: 99.99 * item.quantity
    }));

    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

    const order: Order = {
      id: Date.now().toString(),
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      items,
      total,
      status: 'pending',
      paymentMethod: data.paymentMethod,
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockOrders.push(order);
    return order;
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    await delay(500);
    
    const index = mockOrders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Pedido não encontrado');
    
    mockOrders[index] = {
      ...mockOrders[index],
      status,
      updatedAt: new Date().toISOString()
    };
    
    return mockOrders[index];
  },

  async deleteOrder(id: string): Promise<void> {
    await delay(400);
    
    const index = mockOrders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Pedido não encontrado');
    
    mockOrders.splice(index, 1);
  }
};
