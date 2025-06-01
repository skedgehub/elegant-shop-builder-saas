
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "basic",
    name: "Básico",
    price: "R$ 29",
    period: "/mês",
    description: "Ideal para começar seu negócio online",
    icon: Star,
    color: "from-blue-500 to-blue-600",
    features: [
      "Até 100 produtos",
      "Catálogo online",
      "Suporte por email",
      "1 usuário admin",
      "Relatórios básicos",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Profissional",
    price: "R$ 79",
    period: "/mês",
    description: "Para negócios em crescimento",
    icon: Zap,
    color: "from-purple-500 to-purple-600",
    features: [
      "Até 1.000 produtos",
      "Catálogo online personalizado",
      "Suporte prioritário",
      "5 usuários admin",
      "Relatórios avançados",
      "Integração WhatsApp",
      "Domínio customizado",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Empresarial",
    price: "R$ 199",
    period: "/mês",
    description: "Para grandes empresas",
    icon: Crown,
    color: "from-orange-500 to-orange-600",
    features: [
      "Produtos ilimitados",
      "Múltiplos catálogos",
      "Suporte 24/7",
      "Usuários ilimitados",
      "Analytics completo",
      "API personalizada",
      "Manager dedicado",
      "White label",
    ],
    popular: false,
  },
];

const PlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Aqui você implementaria a lógica de seleção do plano
    console.log("Plano selecionado:", planId);
    navigate("/register", { state: { selectedPlan: planId } });
  };

  const getDiscountedPrice = (price: string) => {
    const numericPrice = parseInt(price.replace(/\D/g, ""));
    const discountedPrice = Math.floor(numericPrice * 0.8); // 20% de desconto
    return `R$ ${discountedPrice}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Escolha o plano ideal para seu
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              negócio digital
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforme seu catálogo em uma loja online profissional e alcance mais clientes
          </p>
        </div>

        {/* Toggle Anual/Mensal */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
            <div className="flex">
              <Button
                variant={!isAnnual ? "default" : "ghost"}
                className={`rounded-full px-8 py-2 transition-all ${
                  !isAnnual ? "shadow-md" : ""
                }`}
                onClick={() => setIsAnnual(false)}
              >
                Mensal
              </Button>
              <Button
                variant={isAnnual ? "default" : "ghost"}
                className={`rounded-full px-8 py-2 transition-all ${
                  isAnnual ? "shadow-md" : ""
                }`}
                onClick={() => setIsAnnual(true)}
              >
                Anual
                <Badge className="ml-2 bg-green-500 text-white">-20%</Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? "ring-2 ring-purple-500 shadow-2xl scale-105"
                    : "hover:shadow-xl hover:scale-102"
                } ${
                  isSelected ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                      🔥 Mais Popular
                    </div>
                  </div>
                )}

                <CardHeader className={`text-center ${plan.popular ? "pt-12" : "pt-6"}`}>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                  
                  <div className="mt-6">
                    {isAnnual ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-center">
                          <span className="text-4xl font-bold text-gray-900">
                            {getDiscountedPrice(plan.price)}
                          </span>
                          <span className="text-gray-600 ml-1">{plan.period}</span>
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          {plan.price}{plan.period}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-1">{plan.period}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full mt-8 h-12 font-semibold transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                        : isSelected
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : isSelected ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(plan.id);
                    }}
                  >
                    {isSelected ? "Plano Selecionado" : "Escolher Plano"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Ainda tem dúvidas?
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="font-semibold mb-2">Posso trocar de plano depois?</h4>
              <p className="text-gray-600 text-sm">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="font-semibold mb-2">Existe período de teste?</h4>
              <p className="text-gray-600 text-sm">
                Oferecemos 14 dias grátis para você testar todas as funcionalidades.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Precisa de mais informações? Entre em contato conosco
          </p>
          <Button variant="outline" size="lg" className="rounded-full">
            Falar com Vendas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
