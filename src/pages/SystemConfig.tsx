
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Crown, 
  Zap, 
  Star, 
  Check, 
  ArrowRight,
  CreditCard,
  Calendar,
  Users,
  Package
} from "lucide-react";

const SystemConfig = () => {
  const [currentPlan] = useState("pro"); // Simulando plano atual
  
  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "R$ 29",
      icon: Star,
      color: "from-blue-500 to-blue-600",
      features: ["100 produtos", "1 usuário", "Suporte email"],
    },
    {
      id: "pro",
      name: "Profissional",
      price: "R$ 79",
      icon: Zap,
      color: "from-purple-500 to-purple-600",
      features: ["1.000 produtos", "5 usuários", "Suporte prioritário"],
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: "R$ 199",
      icon: Crown,
      color: "from-orange-500 to-orange-600",
      features: ["Produtos ilimitados", "Usuários ilimitados", "Suporte 24/7"],
    },
  ];

  const handleChangePlan = (planId: string) => {
    console.log("Alterando para plano:", planId);
    // Aqui você implementaria a lógica de mudança de plano
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Configurações do Sistema
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie as configurações da sua conta e plano
        </p>
      </div>

      {/* Plano Atual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Plano Atual</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Plano Profissional
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  R$ 79/mês • Renovação em 15 dias
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Ativo
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">847</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">de 1.000 produtos</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">de 5 usuários</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">11</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">meses ativo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alterar Plano */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5" />
            <span>Alterar Plano</span>
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Faça upgrade ou downgrade do seu plano conforme sua necessidade
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              const isCurrent = plan.id === currentPlan;
              
              return (
                <Card
                  key={plan.id}
                  className={`relative transition-all duration-200 ${
                    isCurrent 
                      ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20" 
                      : "hover:shadow-lg cursor-pointer"
                  }`}
                >
                  {isCurrent && (
                    <Badge className="absolute -top-2 -right-2 bg-purple-500">
                      Atual
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                      <span className="text-sm font-normal text-gray-600">/mês</span>
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {!isCurrent ? (
                      <Button
                        className="w-full"
                        variant={plan.id === "enterprise" ? "default" : "outline"}
                        onClick={() => handleChangePlan(plan.id)}
                      >
                        {plan.id === "basic" ? "Fazer Downgrade" : "Fazer Upgrade"}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button className="w-full" variant="secondary" disabled>
                        Plano Atual
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Configurações Gerais</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Notificações por Email
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receba notificações sobre pedidos e atualizações
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Backup Automático
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Backup diário dos seus dados
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">Ativo</Badge>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                API Access
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gerencie chaves de API para integrações
              </p>
            </div>
            <Button variant="outline" size="sm">
              Gerenciar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemConfig;
