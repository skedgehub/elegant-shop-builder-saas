
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Clock, Package, Truck, CheckCircle, XCircle, User, Calendar } from "lucide-react";

interface OrderDetailsModalProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderDetailsModal = ({ order, open, onOpenChange }: OrderDetailsModalProps) => {
  if (!order) return null;

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

  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || Clock;

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

  const getStatusText = (status: string) => {
    const statusMap = {
      pending: 'Pendente',
      processing: 'Processando',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  // Mock order history for demonstration
  const orderHistory = [
    {
      id: 1,
      action: 'Pedido Criado',
      status: 'pending',
      timestamp: order.created_at,
      user: 'Sistema',
      notes: 'Pedido criado automaticamente'
    },
    {
      id: 2,
      action: 'Status Atualizado',
      status: order.status,
      timestamp: order.updated_at,
      user: 'Admin',
      notes: order.notes || 'Status atualizado manualmente'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Pedido #{order.id.slice(0, 8)}
            <Badge className={statusColors[order.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {getStatusText(order.status)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Detalhes completos do pedido realizado em {formatDate(order.created_at)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Informações do Cliente</Label>
                <div className="mt-2 space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Nome:</span>
                    <p className="font-medium">{order.customer_name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="font-medium">{order.customer_email}</p>
                  </div>
                  {order.customer_phone && (
                    <div>
                      <span className="text-sm text-gray-600">Telefone:</span>
                      <p className="font-medium">{order.customer_phone}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Endereço de Entrega</Label>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    {order.customer_address || 'Endereço não informado'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">Itens do Pedido</Label>
            <div className="space-y-3">
              {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Quantidade: {item.quantity} x {formatCurrency(item.price)}
                      </p>
                      {item.customFields && Object.keys(item.customFields).length > 0 && (
                        <div className="mt-1">
                          {Object.entries(item.customFields).map(([key, value]) => (
                            <p key={key} className="text-xs text-gray-500">
                              {key}: {value as string}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">Resumo do Pedido</Label>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.total_amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Frete:</span>
                <span>A calcular</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-green-600">{formatCurrency(order.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">Histórico de Alterações</Label>
            <div className="space-y-3">
              {orderHistory.map((historyItem) => (
                <div key={historyItem.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {historyItem.action === 'Pedido Criado' ? (
                      <Package className="h-5 w-5 text-blue-600" />
                    ) : (
                      <User className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-blue-900">{historyItem.action}</p>
                      <div className="flex items-center text-sm text-blue-700">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(historyItem.timestamp)}
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-blue-700">Alterado por: {historyItem.user}</p>
                      {historyItem.notes && (
                        <p className="text-sm text-gray-600 mt-1">{historyItem.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Notes */}
          {order.notes && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Observações Atuais</Label>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-700">{order.notes}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
