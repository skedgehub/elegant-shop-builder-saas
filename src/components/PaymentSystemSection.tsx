
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Smartphone, 
  Shield,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Zap,
  QrCode,
  Banknote,
  Receipt
} from "lucide-react";

const PaymentSystemSection = () => {
  const paymentFeatures = [
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Checkout Integrado",
      description: "Receba pagamentos diretamente no seu catálogo com checkout seguro e otimizado para conversão.",
      benefits: ["PIX instantâneo", "Cartão em 1 clique", "Boleto automático"]
    },
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "PIX Nativo",
      description: "QR Code automático para cada produto, facilitando pagamentos instantâneos via PIX.",
      benefits: ["QR Code automático", "Recebimento instantâneo", "Sem taxas extras"]
    },
    {
      icon: <Receipt className="h-6 w-6" />,
      title: "Taxas Competitivas",
      description: "As menores taxas do mercado com repasse automático para sua conta bancária.",
      benefits: ["1,99% no cartão", "PIX gratuito", "Saque D+1"]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Segurança Total",
      description: "Certificação PCI DSS e criptografia de ponta a ponta para proteger seus clientes.",
      benefits: ["PCI DSS certificado", "SSL 256 bits", "Antifraude ativo"]
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-colors">
            <Zap className="h-3 w-3 mr-2" />
            Pagamentos Integrados
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-tight">
            Receba pagamentos
            <span className="block font-semibold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              direto no catálogo.
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
            Sistema de pagamentos nativo com PIX, cartão e boleto. 
            Sem redirecionamentos, sem complicação.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {paymentFeatures.map((feature, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-primary/20 p-3 rounded-xl group-hover:bg-primary/30 transition-colors">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300 font-light">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { value: "99,9%", label: "Uptime garantido", icon: <Shield className="h-5 w-5" /> },
            { value: "1,99%", label: "Taxa cartão de crédito", icon: <CreditCard className="h-5 w-5" /> },
            { value: "0%", label: "Taxa PIX e boleto", icon: <Banknote className="h-5 w-5" /> }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3 text-primary">
                {stat.icon}
              </div>
              <div className="text-3xl font-semibold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="text-base px-8 py-6 bg-primary hover:bg-primary/90 text-black shadow-xl group"
          >
            <Smartphone className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Ativar Pagamentos Agora
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-gray-400 mt-4 font-light">
            Configuração em minutos • Sem mensalidade • Suporte especializado
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentSystemSection;
