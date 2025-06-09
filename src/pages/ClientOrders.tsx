
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ShoppingBag, Package2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

  const getOrderStats = () => {
    const total = mockOrders.length;
    const active = mockOrders.filter(order => !["delivered", "cancelled"].includes(order.status)).length;
    const delivered = mockOrders.filter(order => order.status === "delivered").length;
    
    return { total, active, delivered };
  };

  const stats = getOrderStats();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Meus Pedidos</h1>
        <p className="text-muted-foreground">
          Acompanhe o status dos seus pedidos e histórico de compras
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Pedidos</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Package2 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold text-foreground">{stats.active}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Entregues</p>
                <p className="text-2xl font-bold text-foreground">{stats.delivered}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar pedidos..."
          className="pl-10 bg-background border-border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
          <TabsTrigger value="all" className="data-[state=active]:bg-background">
            Todos
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {stats.total}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-background">
            Ativos
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {stats.active}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="delivered" className="data-[state=active]:bg-background">
            Entregues
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {stats.delivered}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-16">
                <div className="space-y-4">
                  <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      Nenhum pedido encontrado
                    </h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      {searchTerm 
                        ? "Tente buscar com outros termos" 
                        : "Você ainda não fez nenhum pedido"
                      }
                    </p>
                  </div>
                </div>
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
