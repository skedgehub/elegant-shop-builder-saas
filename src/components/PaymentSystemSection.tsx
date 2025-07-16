
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Shield, 
  Zap, 
  CheckCircle, 
  Smartphone,
  BarChart3,
  ArrowRight,
  Banknote
} from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSystemSection = () => {
  const paymentFeatures = [
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Múltiplas Formas de Pagamento",
      description: "PIX, cartão de crédito, débito e boleto bancário integrados"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Segurança Máxima",
      description: "Certificação PCI DSS e criptografia de ponta a ponta"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Checkout Ultra-Rápido",
      description: "Finalização de compra em apenas 1 clique"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile First",
      description: "Otimizado para compras no celular"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Relatórios Detalhados",
      description: "Acompanhe vendas e conversões em tempo real"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Aprovação Instantânea",
      description: "Processamento automático de pagamentos"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-200 hover:bg-green-200 transition-colors">
            <Banknote className="h-4 w-4 mr-2" />
            Sistema de Pagamentos Integrado
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-light text-black mb-8 tracking-tight">
            Receba pagamentos
            <span className="block font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              direto no seu catálogo
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
            Sistema completo de pagamentos que converte mais e oferece a melhor experiência para seus clientes
          </p>
        </div>

        {/* Payment Dashboard Preview */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Vendas Hoje</p>
                          <p className="text-2xl font-bold text-green-600">R$ 12.450</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600 font-medium">+23%</p>
                        <p className="text-xs text-gray-500">vs. ontem</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium">PIX</span>
                        <span className="text-sm font-bold text-blue-600">67%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm font-medium">Cartão</span>
                        <span className="text-sm font-bold text-purple-600">28%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm font-medium">Boleto</span>
                        <span className="text-sm font-bold text-orange-600">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Checkout Rápido</h3>
                      <Shield className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm">Pagamento por PIX</span>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Valor total</p>
                        <p className="text-2xl font-bold text-green-400">R$ 89,90</p>
                      </div>
                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                        Pagar com PIX
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {paymentFeatures.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-light">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-black rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-light mb-4">
                Comece a receber pagamentos
                <span className="block font-semibold">hoje mesmo</span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 font-light">
                Configure seu sistema de pagamentos em minutos e aumente suas vendas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="text-base px-8 py-6 bg-primary hover:bg-primary/90 text-black shadow-xl group"
                  >
                    Ativar Pagamentos Grátis
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-6 text-white border-white hover:bg-white hover:text-black"
                  >
                    Ver Demonstração
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSystemSection;
