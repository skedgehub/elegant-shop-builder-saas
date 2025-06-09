
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Download,
  XCircle,
  Package,
  MapPin,
  Phone,
  Mail,
  Clock,
  Truck,
  CheckCircle
} from "lucide-react";
import OrderStatusProgress from "@/components/OrderStatusProgress";
import { generateOrderPDF } from "@/services/pdfService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface OrderCardProps {
  order: any;
  onCancelOrder?: (orderId: string) => void;
}

const OrderCard = ({ order, onCancelOrder }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "preparing": return "bg-orange-100 text-orange-800 border-orange-200";
      case "shipped": return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-3 w-3" />;
      case "confirmed": return <CheckCircle className="h-3 w-3" />;
      case "preparing": return <Package className="h-3 w-3" />;
      case "shipped": return <Truck className="h-3 w-3" />;
      case "delivered": return <CheckCircle className="h-3 w-3" />;
      case "cancelled": return <XCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const canCancelOrder = (status: string) => {
    return ["pending", "confirmed", "preparing"].includes(status);
  };

  const handleDownloadPDF = () => {
    generateOrderPDF({
      id: order.id,
      date: order.date,
      status: order.status,
      total: order.total,
      customer: order.customer,
      items: order.items
    });
  };

  const handleCancelOrder = () => {
    if (onCancelOrder) {
      onCancelOrder(order.id);
    }
  };

  return (
    <Card className="overflow-hidden border-border hover:shadow-lg transition-all duration-300 bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg text-foreground">#{order.id}</h3>
              <Badge className={`border ${getStatusColor(order.status)} text-xs font-medium px-2 py-1`}>
                {getStatusIcon(order.status)}
                <span className="ml-1">{getStatusLabel(order.status)}</span>
              </Badge>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{new Date(order.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package className="h-4 w-4" />
                <span>{order.items.length} {order.items.length === 1 ? 'item' : 'itens'}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <div className="text-2xl font-bold text-foreground">
              R$ {order.total.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              Total do pedido
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <OrderStatusProgress status={order.status} />
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 sm:flex-none"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Recolher
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Ver Detalhes
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPDF}
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          
          {canCancelOrder(order.status) && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancelar Pedido</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja cancelar o pedido #{order.id}? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Não, manter pedido</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleCancelOrder}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Sim, cancelar pedido
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {isExpanded && (
          <div className="space-y-6 pt-4 border-t border-border">
            {/* Itens do Pedido */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Package className="h-4 w-4" />
                Itens do Pedido
              </h4>
              <div className="space-y-2">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Quantidade: {item.quantity} | Preço unit: R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-foreground">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dados de Entrega */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Dados de Entrega
              </h4>
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{order.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{order.customer.phone}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <span className="text-foreground">{order.customer.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
