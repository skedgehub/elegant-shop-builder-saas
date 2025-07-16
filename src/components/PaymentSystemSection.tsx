
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  Zap, 
  Check,
  TrendingUp,
  Lock,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSystemSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-green-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-200">
            <CreditCard className="h-4 w-4 mr-2" />
            Sistema de Pagamentos Integrado
          </Badge>
          <h2 className="text-4xl md:text-6xl font-light text-black mb-8 tracking-tight">
            Receba pagamentos
            <span className="block font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              diretamente no seu catálogo
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
            Sistema completo de pagamentos com PIX, cartão e boleto. Transforme cada visita em venda automaticamente.
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {[
            {
              icon: <Zap className="h-8 w-8" />,
              title: "PIX Instantâneo",
              description: "Recebimento em tempo real com QR Code automático",
              gradient: "from-green-500 to-emerald-600"
            },
            {
              icon: <CreditCard className="h-8 w-8" />,
              title: "Cartão de Crédito",
              description: "Parcelamento em até 12x com aprovação instantânea",
              gradient: "from-blue-500 to-indigo-600"
            },
            {
              icon: <Smartphone className="h-8 w-8" />,
              title: "Carteira Digital",
              description: "Integração com principais carteiras digitais",
              gradient: "from-purple-500 to-pink-600"
            }
          ].map((method, index) => (
            <Card key={index} className="border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${method.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {method.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {method.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <Card className="border border-gray-100 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-black mb-3">
                    Aumento Comprovado de Vendas
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    Empresas que implementaram nosso sistema de pagamentos viram suas vendas aumentarem em média 300% no primeiro mês.
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Checkout em 1 clique para conversão máxima",
                  "Carrinho abandonado? Recuperação automática",
                  "Analytics de conversão em tempo real",
                  "Otimização automática para mobile"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-black mb-3">
                    Segurança Bancária Premium
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    Certificações internacionais e criptografia de nível bancário para proteger você e seus clientes.
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Certificação PCI DSS Level 1",
                  "Criptografia AES-256 em todas as transações",
                  "Monitoramento 24/7 contra fraudes",
                  "Compliance total com LGPD"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Lock className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto border border-gray-200 bg-white/95 backdrop-blur-sm shadow-xl">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-green-500 text-black">
                  <Globe className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold text-black mb-6">
                Comece a Receber Pagamentos Hoje Mesmo
              </h3>
              <p className="text-xl text-gray-600 font-light mb-8 max-w-2xl mx-auto">
                Configure em 5 minutos e comece a vender. Sem taxas de setup, sem mensalidades extras no sistema de pagamentos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button 
                    size="lg"
                    className="text-base px-8 py-6 bg-black hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                  >
                    Configurar Pagamentos Grátis
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="text-base px-8 py-6 border-gray-300 hover:bg-gray-50"
                  >
                    Ver Demo dos Pagamentos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PaymentSystemSection;
