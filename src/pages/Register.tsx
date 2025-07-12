
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CreditCard,
  Check,
  ArrowLeft,
  Star,
  Zap,
  Crown,
  Building,
  Phone,
  Globe,
  ChevronRight,
  Sparkles,
  Shield,
  Clock,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISignUpInputDto, SignUpInputDto } from "@/types/auth";
import { InputField } from "@/components/InputField";

const Register = () => {
  const navigate = useNavigate();
  const { register: RegisterCompany, isRegisterLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "R$ 29",
      period: "/mês",
      icon: Star,
      color: "bg-blue-500",
      popular: false,
      savings: "",
      features: [
        "Até 100 produtos",
        "1 catálogo",
        "Suporte por email",
        "Campos personalizados básicos",
      ],
    },
    {
      id: "pro",
      name: "Profissional",
      price: "R$ 59",
      period: "/mês",
      icon: Zap,
      color: "bg-primary",
      popular: true,
      savings: "Mais escolhido",
      features: [
        "Até 1000 produtos",
        "3 catálogos",
        "Suporte prioritário",
        "Campos personalizados avançados",
        "Relatórios detalhados",
        "Integração WhatsApp",
      ],
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: "R$ 99",
      period: "/mês",
      icon: Crown,
      color: "bg-gray-900",
      popular: false,
      savings: "Para empresas",
      features: [
        "Produtos ilimitados",
        "Catálogos ilimitados",
        "Suporte 24/7",
        "Todos os recursos",
        "API personalizada",
        "White label",
      ],
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Configure em 5 minutos",
      description: "Seu catálogo online pronto rapidamente"
    },
    {
      icon: Shield,
      title: "Dados seguros",
      description: "Proteção completa das suas informações"
    },
    {
      icon: Sparkles,
      title: "Design profissional",
      description: "Templates modernos e responsivos"
    }
  ];

  const form = useForm<ISignUpInputDto>({
    resolver: zodResolver(SignUpInputDto),
    defaultValues: {
      provider: "email",
      planId: selectedPlan,
    },
  });

  const { register, setValue, handleSubmit, trigger, watch } = form;
  const watchedFields = watch();

  const onSubmite = async (data: ISignUpInputDto) => {
    if (step === 1) {
      const isValid = await trigger([
        "displayName",
        "email",
        "phone",
        "password",
        "confirmPassword",
      ]);

      if (isValid) {
        setStep(2);
      }
    } else if (step === 2) {
      const isValid = await trigger([
        "company.fantasyName",
        "company.legalName",
        "company.cnpj",
        "company.subdomain",
        "company.email",
        "company.phone",
      ]);

      if (isValid) {
        setStep(3);
      }
    } else if (step === 3) {
      setStep(4);
    } else {
      RegisterCompany({
        body: data,
      });
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Crie sua conta";
      case 2:
        return "Dados da empresa";
      case 3:
        return "Escolha seu plano";
      case 4:
        return "Finalizar cadastro";
      default:
        return "Cadastro";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Comece criando sua conta pessoal";
      case 2:
        return "Informe os dados da sua empresa";
      case 3:
        return "Selecione o plano ideal para seu negócio";
      case 4:
        return "Complete seu cadastro com os dados de pagamento";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-inter">
      {/* Header with progress */}
      <header className="p-6 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => step > 1 ? setStep(step - 1) : navigate("/")}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {step > 1 ? "Voltar" : "Início"}
            </Button>

            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">W</span>
              </div>
              <span className="text-lg font-bold text-black">Wibbo</span>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{step}</span>
              <span>/</span>
              <span>4</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {/* Hero section for step 1 */}
          {step === 1 && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                Junte-se a mais de 1.000 empresas
              </div>
              <h1 className="text-4xl font-bold text-black mb-4">
                Crie seu catálogo online em minutos
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Transforme sua empresa digital com nossa plataforma completa para catálogos online
              </p>
              
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex flex-col items-center p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 text-center">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-black">
                {getStepTitle()}
              </CardTitle>
              <CardDescription className="text-lg">
                {getStepDescription()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmite)} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <InputField
                        control={form.control}
                        name="displayName"
                        label="Nome completo"
                        placeholder="Seu nome completo"
                        endComponent={<User size={18} />}
                      />

                      <InputField
                        control={form.control}
                        name="email"
                        label="E-mail"
                        type="email"
                        placeholder="seu@email.com"
                        endComponent={<Mail size={18} />}
                      />

                      <InputField
                        control={form.control}
                        name="phone"
                        label="Telefone"
                        placeholder="(11) 98888-8888"
                        endComponent={<Phone size={18} />}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          control={form.control}
                          name="password"
                          label="Senha"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 6 caracteres"
                          endComponent={
                            showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )
                          }
                          onTrailingIconClick={() => setShowPassword((v) => !v)}
                        />

                        <InputField
                          control={form.control}
                          name="confirmPassword"
                          label="Confirmar senha"
                          type="password"
                          placeholder="Confirme sua senha"
                          endComponent={<Lock size={18} />}
                        />
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                        <p>Ao continuar, você concorda com nossos <Link to="#" className="text-primary hover:underline">Termos de Uso</Link> e <Link to="#" className="text-primary hover:underline">Política de Privacidade</Link>.</p>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          control={form.control}
                          name="company.fantasyName"
                          label="Nome fantasia"
                          placeholder="Minha Empresa"
                          endComponent={<Building size={18} />}
                        />

                        <InputField
                          control={form.control}
                          name="company.legalName"
                          label="Razão social"
                          placeholder="Minha Empresa LTDA"
                        />
                      </div>

                      <InputField
                        control={form.control}
                        name="company.cnpj"
                        label="CNPJ"
                        placeholder="00.000.000/0001-00"
                      />

                      <InputField
                        control={form.control}
                        name="company.subdomain"
                        label="Seu endereço online"
                        placeholder="minhaempresa"
                        endComponent=".catalogo.com.br"
                        startComponent={<Globe size={18} />}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          control={form.control}
                          name="company.email"
                          label="E-mail da empresa"
                          type="email"
                          placeholder="contato@empresa.com"
                          endComponent={<Mail size={18} />}
                        />

                        <InputField
                          control={form.control}
                          name="company.phone"
                          label="Telefone da empresa"
                          placeholder="(11) 99999-9999"
                          endComponent={<Phone size={18} />}
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold mb-2">Escolha o plano ideal para sua empresa</h3>
                        <p className="text-gray-600">Você pode mudar de plano a qualquer momento</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {plans.map((plan) => {
                          const IconComponent = plan.icon;
                          return (
                            <div
                              key={plan.id}
                              className={`
                                relative p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg
                                ${
                                  selectedPlan === plan.id
                                    ? "border-primary bg-primary/5 shadow-lg transform scale-105"
                                    : "border-gray-200 hover:border-gray-300"
                                }
                              `}
                              onClick={() => {
                                setSelectedPlan(plan.id);
                                setValue("planId", plan.id);
                              }}
                            >
                              {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-black px-3 py-1">
                                  {plan.savings}
                                </Badge>
                              )}
                              
                              <div className="text-center mb-4">
                                <div
                                  className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
                                >
                                  <IconComponent className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-bold text-lg text-black mb-1">
                                  {plan.name}
                                </h3>
                                <div className="mb-3">
                                  <span className="text-3xl font-bold text-black">
                                    {plan.price}
                                  </span>
                                  <span className="text-gray-600 text-sm">
                                    {plan.period}
                                  </span>
                                </div>
                              </div>
                              
                              <ul className="space-y-2">
                                {plan.features.map((feature, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center text-sm"
                                  >
                                    <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                                    <span className="text-gray-700">
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              
                              {selectedPlan === plan.id && (
                                <div className="absolute inset-0 border-2 border-primary rounded-xl pointer-events-none">
                                  <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <p className="font-medium text-blue-900">Garantia de 30 dias</p>
                            <p className="text-sm text-blue-700">Não gostou? Devolvemos seu dinheiro sem perguntas</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-4">Resumo do pedido</h3>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            Plano {plans.find((p) => p.id === selectedPlan)?.name}
                          </span>
                          <span className="font-bold text-lg">
                            {plans.find((p) => p.id === selectedPlan)?.price}/mês
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nome no cartão</Label>
                          <Input
                            id="cardName"
                            placeholder="Nome como aparece no cartão"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número do cartão</Label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Validade</Label>
                            <Input id="expiryDate" placeholder="MM/AA" required />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <Check className="h-5 w-5 text-green-600 mr-3" />
                          <div>
                            <p className="font-medium text-green-900">Pagamento seguro</p>
                            <p className="text-sm text-green-700">Seus dados estão protegidos com criptografia SSL</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-6 border-t">
                    <div className="text-sm text-gray-600">
                      {step < 4 ? (
                        <span>Etapa {step} de 4</span>
                      ) : (
                        <span>Finalizando cadastro...</span>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-3 text-lg"
                      disabled={isRegisterLoading}
                    >
                      {step === 4 ? (
                        isRegisterLoading ? (
                          "Finalizando..."
                        ) : (
                          "Finalizar cadastro"
                        )
                      ) : (
                        <>
                          Continuar
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
              
              {step === 1 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Já tem uma conta?{" "}
                    <Link
                      to="/login"
                      className="text-primary hover:text-primary/80 font-medium"
                    >
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
