import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Mail, Lock, User, CreditCard, Check, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register, isRegisterLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    subdomain: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });

  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "R$ 29",
      period: "/mês",
      features: [
        "Até 100 produtos",
        "1 catálogo",
        "Suporte por email",
        "Campos personalizados básicos"
      ]
    },
    {
      id: "pro",
      name: "Profissional",
      price: "R$ 59",
      period: "/mês",
      features: [
        "Até 1000 produtos",
        "3 catálogos",
        "Suporte prioritário",
        "Campos personalizados avançados",
        "Relatórios detalhados",
        "Integração WhatsApp"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: "R$ 99",
      period: "/mês",
      features: [
        "Produtos ilimitados",
        "Catálogos ilimitados",
        "Suporte 24/7",
        "Todos os recursos",
        "API personalizada",
        "White label"
      ]
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col">
      {/* Header */}
      <header className="p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao início
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-lg font-bold text-primary-600">CatalogoPro</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Crie sua conta</h1>
            <p className="text-gray-600 mt-2">Comece hoje mesmo e transforme seu negócio</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                    ${step >= stepNumber ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'}
                  `}>
                    {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`
                      w-16 h-1 mx-2 transition-all
                      ${step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Dados Pessoais"}
                {step === 2 && "Escolha seu Plano"}
                {step === 3 && "Dados do Cartão"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Preencha seus dados para criar a conta"}
                {step === 2 && "Selecione o plano ideal para seu negócio"}
                {step === 3 && "Finalize seu cadastro com os dados de pagamento"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="name"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subdomain">Subdomínio</Label>
                      <div className="flex">
                        <Input
                          id="subdomain"
                          placeholder="minhaloja"
                          value={formData.subdomain}
                          onChange={(e) => handleInputChange("subdomain", e.target.value)}
                          className="rounded-r-none"
                          required
                        />
                        <div className="bg-gray-100 border border-l-0 px-3 py-2 text-sm text-gray-600 rounded-r-md">
                          .catalogo.com.br
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Sua senha"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirme sua senha"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          className={`
                            relative p-6 rounded-lg border-2 cursor-pointer transition-all
                            ${selectedPlan === plan.id 
                              ? 'border-primary-600 bg-primary-50' 
                              : 'border-gray-200 hover:border-gray-300'
                            }
                          `}
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          {plan.popular && (
                            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                              Mais Popular
                            </Badge>
                          )}
                          <div className="text-center">
                            <h3 className="font-semibold text-lg">{plan.name}</h3>
                            <div className="mt-2">
                              <span className="text-3xl font-bold">{plan.price}</span>
                              <span className="text-gray-600">{plan.period}</span>
                            </div>
                          </div>
                          <ul className="mt-4 space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nome no Cartão</Label>
                      <Input
                        id="cardName"
                        placeholder="Nome como aparece no cartão"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Validade</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/AA"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Plano selecionado:</span>
                        <span className="font-bold">
                          {plans.find(p => p.id === selectedPlan)?.name} - {plans.find(p => p.id === selectedPlan)?.price}/mês
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                      Voltar
                    </Button>
                  )}
                  <Button type="submit" className={step === 1 ? "w-full" : ""}>
                    {step === 3 ? "Finalizar Cadastro" : "Continuar"}
                  </Button>
                </div>
              </form>

              {step === 1 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Já tem uma conta?{" "}
                    <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                      Faça login aqui
                    </Link>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
