
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Download,
  XCircle,
  Package,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import OrderStatusProgress from "@/components/OrderStatusProgress";
import { generateOrderPDF } from "@/services/pdfService";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
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
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "preparing": return "bg-orange-100 text-orange-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg">Pedido {order.id}</h3>
              <Badge className={getStatusColor(order.status)}>
                {getStatusLabel(order.status)}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(order.date).toLocaleDateString('pt-BR')}
              </div>
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-green-600">
              R$ {order.total.toFixed(2)}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          <OrderStatusProgress status={order.status} />
          
          <div className="flex flex-wrap gap-2">
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
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar Pedido</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja cancelar o pedido {order.id}? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Não, manter pedido</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleCancelOrder}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Sim, cancelar pedido
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t space-y-4">
              {/* Itens do Pedido */}
              <div>
                <h4 className="font-medium mb-3">Itens do Pedido</h4>
                <div className="space-y-2">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">Quantidade: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dados de Entrega */}
              <div>
                <h4 className="font-medium mb-3">Dados de Entrega</h4>
                <div className="bg-gray-50 p-3 rounded space-y-2 text-sm">
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
