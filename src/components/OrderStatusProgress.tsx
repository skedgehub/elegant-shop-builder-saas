
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  CheckCircle, 
  Truck, 
  Package, 
  XCircle 
} from "lucide-react";

interface OrderStatusProgressProps {
  status: string;
  className?: string;
}

const OrderStatusProgress = ({ status, className = "" }: OrderStatusProgressProps) => {
  const statusSteps = [
    { key: "pending", label: "Pendente", icon: Clock },
    { key: "confirmed", label: "Confirmado", icon: CheckCircle },
    { key: "preparing", label: "Preparando", icon: Package },
    { key: "shipped", label: "Enviado", icon: Truck },
    { key: "delivered", label: "Entregue", icon: CheckCircle },
  ];

  const getStatusIndex = (currentStatus: string) => {
    const index = statusSteps.findIndex(step => step.key === currentStatus);
    return index === -1 ? 0 : index;
  };

  const getCurrentIndex = getStatusIndex(status);
  const progress = status === "cancelled" ? 0 : ((getCurrentIndex + 1) / statusSteps.length) * 100;

  const getStatusColor = (stepIndex: number) => {
    if (status === "cancelled") return "text-red-500";
    if (stepIndex <= getCurrentIndex) return "text-green-600";
    return "text-gray-400";
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "confirmed":
        return "default";
      case "preparing":
        return "default";
      case "shipped":
        return "default";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente";
      case "confirmed":
        return "Confirmado";
      case "preparing":
        return "Preparando";
      case "shipped":
        return "Enviado";
      case "delivered":
        return "Entregue";
      case "cancelled":
        return "Cancelado";
      default:
        return "Desconhecido";
    }
  };

  if (status === "cancelled") {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">Status do Pedido</span>
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Cancelado
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-red-600">
          <XCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Pedido cancelado</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">Status do Pedido</span>
        <Badge variant={getStatusBadgeVariant(status)}>
          {getStatusLabel(status)}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-between">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= getCurrentIndex;
            const isCurrent = index === getCurrentIndex;
            
            return (
              <div key={step.key} className="flex flex-col items-center space-y-1">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors
                    ${
                      isCompleted
                        ? "bg-green-600 border-green-600 text-white"
                        : isCurrent
                        ? "bg-white border-primary text-primary"
                        : "bg-white border-gray-300 text-gray-400"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span 
                  className={`
                    text-xs font-medium text-center
                    ${getStatusColor(index)}
                  `}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusProgress;
