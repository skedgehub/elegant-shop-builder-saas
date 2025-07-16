
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Banknote, 
  PiggyBank, 
  ArrowLeftRight, 
  Smartphone, 
  Shield,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Zap
} from "lucide-react";

const PaymentSystemSection = () => {
  const bankingFeatures = [
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Conta Digital Completa",
      description: "Conta empresarial integrada ao seu catálogo para receber e gerenciar todas as vendas em um só lugar.",
      benefits: ["Conta gratuita", "Sem taxa de manutenção", "Cartão empresarial"]
    },
    {
      icon: <Banknote className="h-6 w-6" />,
      title: "Recebimento Instantâneo",
      description: "Receba pagamentos via PIX na hora, cartão em D+1 e tenha controle total do seu fluxo de caixa.",
      benefits: ["PIX instantâneo", "TED/DOC grátis", "Saque sem taxas"]
    },
    {
      icon: <PiggyBank className="h-6 w-6" />,
      title: "Rendimento Automático",
      description: "Seu dinheiro rende 100% do CDI automaticamente, sem aplicação manual ou taxas escondidas.",
      benefits: ["100% CDI", "Liquidez diária", "Sem taxa de administração"]
    },
    {
      icon: <ArrowLeftRight className="h-6 w-6" />,
      title: "Transferências Ilimitadas",
      description: "Faça quantas transferências precisar sem limite de valor ou quantidade, tudo integrado ao sistema.",
      benefits: ["TED/PIX grátis", "Sem limite", "API integrada"]
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
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
            Sistema Bancário Integrado
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-tight">
            Mais que um catálogo.
            <span className="block font-semibold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              Um banco completo.
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
            Conta digital empresarial, recebimento automático e rendimento do seu dinheiro. 
            Tudo integrado ao seu catálogo sem burocracias.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {bankingFeatures.map((feature, index) => (
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
            { value: "R$ 100M+", label: "Processados mensalmente", icon: <TrendingUp className="h-5 w-5" /> },
            { value: "0%", label: "Taxa de abertura de conta", icon: <CreditCard className="h-5 w-5" /> },
            { value: "100%", label: "Do CDI rendendo automático", icon: <PiggyBank className="h-5 w-5" /> }
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
            Abrir Conta Digital Grátis
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-gray-400 mt-4 font-light">
            Conta aprovada em minutos • Sem burocracia • Cartão incluso
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentSystemSection;
