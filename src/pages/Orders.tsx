
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Eye, Package, Clock, CheckCircle, XCircle, Truck, FileText } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import OrderFilters, { OrderFilters as OrderFiltersType } from "@/components/OrderFilters";
import OrderDetailsModal from "@/components/OrderDetailsModal";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";
import { useCategories } from "@/hooks/useCategories";

const Orders = () => {
  const { user } = useAuth();
  const { orders, isLoading, updateOrderStatus, isUpdating } = useOrders(user?.company_id);
  const { categories } = useCategories(user?.company_id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [detailsOrder, setDetailsOrder] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<OrderFiltersType>({
    status: "",
    dateFrom: null,
    dateTo: null,
    category: "",
    customerName: ""
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    processing: "bg-blue-100 text-blue-800 border-blue-300",
    shipped: "bg-purple-100 text-purple-800 border-purple-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-red-100 text-red-800 border-red-300"
  };

  const statusIcons = {
    pending: Clock,
    processing: Package,
    shipped: Truck,
    delivered: CheckCircle,
    cancelled: XCircle
  };

  // Filter orders based on applied filters and search term
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Search filter
      if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status && filters.status !== "all" && order.status !== filters.status) {
        return false;
      }

      // Customer name filter
      if (filters.customerName && !order.customer_name.toLowerCase().includes(filters.customerName.toLowerCase())) {
        return false;
      }

      // Date filters
      const orderDate = new Date(order.created_at);
      if (filters.dateFrom && orderDate < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo) {
        const dateTo = new Date(filters.dateTo);
        dateTo.setHours(23, 59, 59, 999); // End of day
        if (orderDate > dateTo) {
          return false;
        }
      }

      // Category filter - check if any item in the order belongs to the selected category
      if (filters.category && filters.category !== "all" && Array.isArray(order.items)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hasCategory = order.items.some((item: any) => item.category_id === filters.category);
        if (!hasCategory) {
          return false;
        }
      }

      return true;
    });
  }, [orders, filters, searchTerm]);

  const handleStatusUpdate = () => {
    if (!selectedOrder || !newStatus) return;
    
    updateOrderStatus({
      id: selectedOrder.id,
      status: newStatus,
      notes: notes
    });
    
    setSelectedOrder(null);
    setNewStatus("");
    setNotes("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewDetails = (order: any) => {
    setDetailsOrder(order);
    setShowDetailsModal(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <>
        <div className="p-6 space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pedidos</h1>
            <p className="text-gray-600 dark:text-gray-400">Gerencie todos os pedidos recebidos</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {filteredOrders.length} de {orders.length} pedidos
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <OrderFilters 
          onFilterChange={setFilters}
          onSearchChange={setSearchTerm}
          categories={categories}
        />

        <Card>
          <CardHeader>
            <CardTitle>Lista de Pedidos</CardTitle>
            <CardDescription>
              Visualize e gerencie todos os pedidos da sua loja
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {orders.length === 0 ? "Nenhum pedido encontrado" : "Nenhum pedido corresponde aos filtros"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {orders.length === 0 
                    ? "Quando você receber pedidos, eles aparecerão aqui."
                    : "Tente ajustar os filtros para encontrar os pedidos desejados."
                  }
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || Clock;
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          #{order.id.slice(0, 8)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customer_name}</div>
                            <div className="text-sm text-gray-600">{order.customer_email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(order.total_amount)}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[order.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {order.status === 'pending' && 'Pendente'}
                            {order.status === 'processing' && 'Processando'}
                            {order.status === 'shipped' && 'Enviado'}
                            {order.status === 'delivered' && 'Entregue'}
                            {order.status === 'cancelled' && 'Cancelado'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDate(order.created_at)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(order)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Detalhes
                            </Button>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Editar
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Atualizar Pedido #{order.id.slice(0, 8)}</DialogTitle>
                                  <DialogDescription>
                                    Atualize o status e adicione observações ao pedido
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="status">Atualizar Status</Label>
                                    <Select value={newStatus} onValueChange={setNewStatus}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecione um status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">Pendente</SelectItem>
                                        <SelectItem value="processing">Processando</SelectItem>
                                        <SelectItem value="shipped">Enviado</SelectItem>
                                        <SelectItem value="delivered">Entregue</SelectItem>
                                        <SelectItem value="cancelled">Cancelado</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <Label htmlFor="notes">Observações</Label>
                                    <Textarea
                                      id="notes"
                                      value={notes}
                                      onChange={(e) => setNotes(e.target.value)}
                                      placeholder="Adicione observações sobre o pedido (código de rastreio, etc.)"
                                      rows={3}
                                    />
                                  </div>
                                </div>

                                <DialogFooter>
                                  <Button
                                    onClick={handleStatusUpdate}
                                    disabled={!newStatus || isUpdating}
                                  >
                                    {isUpdating ? "Atualizando..." : "Atualizar Pedido"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Order Details Modal */}
        <OrderDetailsModal
          order={detailsOrder}
          open={showDetailsModal}
          onOpenChange={setShowDetailsModal}
        />
      </div>
    </>
  );
};

export default Orders;
