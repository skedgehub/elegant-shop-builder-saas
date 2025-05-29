
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { useOrderHistory } from "@/hooks/useOrderHistory";

interface OrderDetailsModalProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderDetailsModal = ({ order, open, onOpenChange }: OrderDetailsModalProps) => {
  const { history, isLoading } = useOrderHistory(order?.id);

  const statusIcons = {
    pending: Clock,
    processing: Package,
    shipped: Truck,
    delivered: CheckCircle,
    cancelled: XCircle
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    processing: "bg-blue-100 text-blue-800 border-blue-300",
    shipped: "bg-purple-100 text-purple-800 border-purple-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-red-100 text-red-800 border-red-300"
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

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido #{order.id.slice(0, 8)}</DialogTitle>
          <DialogDescription>
            Informações completas do pedido realizado em {formatDate(order.created_at)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Total */}
          <div className="flex items-center justify-between">
            <Badge className={statusColors[order.status as keyof typeof statusColors]}>
              {(() => {
                const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || Clock;
                return (
                  <>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {order.status === 'pending' && 'Pendente'}
                    {order.status === 'processing' && 'Processando'}
                    {order.status === 'shipped' && 'Enviado'}
                    {order.status === 'delivered' && 'Entregue'}
                    {order.status === 'cancelled' && 'Cancelado'}
                  </>
                );
              })()}
            </Badge>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {formatCurrency(order.total_amount)}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Dados do Cliente</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Nome:</strong> {order.customer_name}</div>
                <div><strong>Email:</strong> {order.customer_email}</div>
                {order.customer_phone && (
                  <div><strong>Telefone:</strong> {order.customer_phone}</div>
                )}
              </div>
            </div>
            
            {order.customer_address && (
              <div>
                <h4 className="font-medium mb-3">Endereço de Entrega</h4>
                <div className="text-sm">
                  {order.customer_address}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h4 className="font-medium mb-4">Itens do Pedido</h4>
            <div className="space-y-3">
              {order.items?.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        {formatCurrency(item.price)} × {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order History */}
          <div>
            <h4 className="font-medium mb-4">Histórico de Alterações</h4>
            {isLoading ? (
              <div className="text-center py-4 text-gray-500">
                Carregando histórico...
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                Nenhuma alteração registrada
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((entry, index) => (
                  <div key={entry.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      {index < history.length - 1 && (
                        <div className="w-px h-8 bg-gray-200 ml-4 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">
                          {entry.status === 'pending' && 'Pendente'}
                          {entry.status === 'processing' && 'Processando'}
                          {entry.status === 'shipped' && 'Enviado'}
                          {entry.status === 'delivered' && 'Entregue'}
                          {entry.status === 'cancelled' && 'Cancelado'}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {formatDate(entry.created_at)}
                        </span>
                      </div>
                      {entry.notes && (
                        <p className="text-sm text-gray-600">{entry.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          {order.notes && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Observações</h4>
                <p className="text-sm text-gray-600">{order.notes}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
