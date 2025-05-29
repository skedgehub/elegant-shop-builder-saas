
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const OrderTracking = () => {
  const [orderCode, setOrderCode] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  const searchOrder = async () => {
    if (!orderCode.trim()) {
      toast({
        title: "Erro",
        description: "Digite o código do pedido",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Search for order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .ilike('id', `%${orderCode}%`)
        .single();

      if (orderError || !orderData) {
        throw new Error('Pedido não encontrado');
      }

      setOrder(orderData);

      // Get order history
      const { data: historyData, error: historyError } = await supabase
        .from('order_status_history')
        .select('*')
        .eq('order_id', orderData.id)
        .order('created_at', { ascending: false });

      if (historyError) {
        console.error('Error fetching order history:', historyError);
      }

      setHistory(historyData || []);

      toast({
        title: "Pedido encontrado!",
        description: "Confira os detalhes abaixo.",
      });
    } catch (error: any) {
      toast({
        title: "Pedido não encontrado",
        description: "Verifique o código e tente novamente.",
        variant: "destructive",
      });
      setOrder(null);
      setHistory([]);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rastreamento de Pedido
          </h1>
          <p className="text-gray-600">
            Digite o código do seu pedido para acompanhar o status
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Buscar Pedido</CardTitle>
            <CardDescription>
              Insira o código do pedido que você recebeu por email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Digite o código do pedido..."
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchOrder()}
                />
              </div>
              <Button onClick={searchOrder} disabled={loading}>
                <Search className="h-4 w-4 mr-2" />
                {loading ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {order && (
          <>
            {/* Order Details */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Pedido #{order.id.slice(0, 8)}</CardTitle>
                    <CardDescription>
                      Realizado em {formatDate(order.created_at)}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {formatCurrency(order.total_amount)}
                    </div>
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
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Dados do Cliente</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>{order.customer_name}</div>
                      <div>{order.customer_email}</div>
                      {order.customer_phone && <div>{order.customer_phone}</div>}
                    </div>
                  </div>
                  
                  {order.customer_address && (
                    <div>
                      <h4 className="font-medium mb-2">Endereço de Entrega</h4>
                      <div className="text-sm text-gray-600">
                        {order.customer_address}
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-medium mb-4">Itens do Pedido</h4>
                  <div className="space-y-3">
                    {order.items?.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-600">
                              Quantidade: {item.quantity}
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
              </CardContent>
            </Card>

            {/* Order History */}
            {history.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Histórico do Pedido</CardTitle>
                  <CardDescription>
                    Acompanhe todas as atualizações do seu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
