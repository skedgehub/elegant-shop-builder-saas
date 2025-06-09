
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ShoppingBag } from "lucide-react";
import OrderCard from "@/components/OrderCard";

// Mock data para demonstração
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 259.90,
    items: [
      { name: "Smartphone Galaxy A54", quantity: 1, price: 199.90 },
      { name: "Capinha Transparente", quantity: 1, price: 29.90 },
      { name: "Película de Vidro", quantity: 1, price: 15.90 },
      { name: "Carregador Rápido", quantity: 1, price: 34.90 }
    ],
    customer: {
      name: "João da Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - Centro - São Paulo/SP"
    }
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    status: "shipped",
    total: 89.90,
    items: [
      { name: "Fone Bluetooth", quantity: 1, price: 69.90 },
      { name: "Cabo USB-C", quantity: 1, price: 19.90 }
    ],
    customer: {
      name: "João da Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - Centro - São Paulo/SP"
    }
  },
  {
    id: "ORD-003",
    date: "2024-01-25",
    status: "preparing",
    total: 149.90,
    items: [
      { name: "Smart Watch", quantity: 1, price: 149.90 }
    ],
    customer: {
      name: "João da Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - Centro - São Paulo/SP"
    }
  }
];

const ClientOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && !["delivered", "cancelled"].includes(order.status);
    if (activeTab === "delivered") return matchesSearch && order.status === "delivered";
    
    return matchesSearch;
  });

  const handleCancelOrder = (orderId: string) => {
    console.log("Cancelar pedido:", orderId);
    // Implementar lógica de cancelamento
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meus Pedidos</h1>
        <p className="text-gray-600 mt-2">
          Acompanhe o status dos seus pedidos e histórico de compras
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar por número do pedido ou produto..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Em Andamento</TabsTrigger>
          <TabsTrigger value="delivered">Entregues</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum pedido encontrado
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? "Tente buscar com outros termos" 
                    : "Você ainda não fez nenhum pedido"
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onCancelOrder={handleCancelOrder}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientOrders;
