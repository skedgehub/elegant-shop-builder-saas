
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Search, 
  Eye, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  ShoppingBag
} from "lucide-react";
import OrderStatusProgress from "@/components/OrderStatusProgress";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pendente";
      case "confirmed": return "Confirmado";
      case "preparing": return "Preparando";
      case "shipped": return "Enviado";
      case "delivered": return "Entregue";
      case "cancelled": return "Cancelado";
      default: return "Desconhecido";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "preparing": return "bg-orange-100 text-orange-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const OrderDetailsModal = ({ order }: { order: any }) => (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Detalhes do Pedido {order.id}
        </DialogTitle>
        <DialogDescription>
          Pedido realizado em {new Date(order.date).toLocaleDateString('pt-BR')}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Status Progress */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <OrderStatusProgress status={order.status} />
        </div>

        {/* Itens do Pedido */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Itens do Pedido</h3>
          <div className="space-y-3">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                </div>
                <p className="font-bold">R$ {item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="font-semibold text-lg">Total:</span>
            <span className="font-bold text-xl text-green-600">
              R$ {order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Dados de Entrega */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Dados de Entrega</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{order.customer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{order.customer.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-1" />
              <span>{order.customer.address}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meus Pedidos</h1>
        <p className="text-gray-600 mt-2">
          Acompanhe o status dos seus pedidos e histórico de compras
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por número do pedido ou produto..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Pedido {order.id}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.date).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                        <p className="text-lg font-bold text-green-600 mt-1">
                          R$ {order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <OrderStatusProgress status={order.status} />
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}:
                        </p>
                        <div className="text-sm text-gray-900">
                          {order.items.map((item, index) => (
                            <span key={index}>
                              {item.name}
                              {index < order.items.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full sm:w-auto">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </DialogTrigger>
                        <OrderDetailsModal order={order} />
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientOrders;
