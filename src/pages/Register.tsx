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
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const SignUpInputDto = z.object({
  displayName: z.string({ required_error: "Nome é obrigatório" }).min(3),
  email: z.string().email(),
  phone: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  provider: z.string().default("email"),
  company: z.object({
    fantasyName: z.string(),
    legalName: z.string(),
    cnpj: z.string(),
    email: z.string(),
    phone: z.string(),
    subdomain: z.string(),
    customDomain: z.string().optional().nullable(),
  }),
  planId: z.string(),
});

export type ISignUpInputDto = z.infer<typeof SignUpInputDto>;

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
      features: [
        "Até 1000 produtos",
        "3 catálogos",
        "Suporte prioritário",
        "Campos personalizados avançados",
        "Relatórios detalhados",
        "Integração WhatsApp",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: "R$ 99",
      period: "/mês",
      icon: Crown,
      color: "bg-gray-900",
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

  const { register, setValue, handleSubmit } = useForm<ISignUpInputDto>({
    resolver: zodResolver(SignUpInputDto),
  });

  const onSubmite = (data: ISignUpInputDto) => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      RegisterCompany({
        body: data,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <header className="p-6 border-b">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao início
            </Button>

            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">W</span>
              </div>
              <span className="text-lg font-bold text-black">Wibbo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Crie sua conta
            </h1>
            <p className="text-gray-600">
              Comece hoje mesmo e transforme seu negócio
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                    ${
                      step >= stepNumber
                        ? "bg-primary text-black"
                        : "bg-gray-200 text-gray-600"
                    }
                  `}
                  >
                    {step > stepNumber ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`
                      w-16 h-1 mx-2 transition-all
                      ${step > stepNumber ? "bg-primary" : "bg-gray-200"}
                    `}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">
                {step === 1 && "Dados da Empresa"}
                {step === 2 && "Escolha seu Plano"}
                {step === 3 && "Dados do Cartão"}
              </CardTitle>
              <CardDescription>
                {step === 1 &&
                  "Preencha os dados da sua empresa para criar a conta"}
                {step === 2 && "Selecione o plano ideal para seu negócio"}
                {step === 3 &&
                  "Finalize seu cadastro com os dados de pagamento"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmite)} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    {/* Nome da Empresa (Nome Fantasia) */}
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Nome da Empresa</Label>
                      <Input
                        id="companyName"
                        placeholder="Minha Empresa"
                        {...register("company.fantasyName")}
                        required
                      />
                    </div>

                    {/* Razão Social */}
                    <div className="space-y-2">
                      <Label htmlFor="legalName">Razão Social</Label>
                      <Input
                        id="legalName"
                        placeholder="Minha Empresa LTDA"
                        {...register("company.legalName")}
                        required
                      />
                    </div>

                    {/* CNPJ */}
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        placeholder="00.000.000/0001-00"
                        {...register("company.cnpj")}
                        required
                      />
                    </div>

                    {/* Subdomínio */}
                    <div className="space-y-2">
                      <Label htmlFor="subdomain">Subdomínio</Label>
                      <div className="flex">
                        <Input
                          id="subdomain"
                          placeholder="minhaempresa"
                          {...register("company.subdomain")}
                          className="rounded-r-none"
                          required
                        />
                        <div className="bg-gray-100 border border-l-0 px-3 py-2 text-sm text-gray-600 rounded-r-md">
                          .catalogo.com.br
                        </div>
                      </div>
                    </div>

                    {/* Email da Empresa */}
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Email da Empresa</Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        placeholder="contato@empresa.com"
                        {...register("company.email")}
                        required
                      />
                    </div>

                    {/* Telefone da Empresa */}
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Telefone da Empresa</Label>
                      <Input
                        id="companyPhone"
                        placeholder="(11) 99999-9999"
                        {...register("company.phone")}
                        required
                      />
                    </div>

                    {/* Nome do Responsável */}
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Nome do Responsável</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="displayName"
                          placeholder="Seu nome completo"
                          {...register("displayName")}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Email do Responsável */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email do Responsável</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          {...register("email")}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Telefone do Responsável */}
                    <div className="space-y-2">
                      <Label htmlFor="userPhone">Telefone do Responsável</Label>
                      <Input
                        id="userPhone"
                        placeholder="(11) 98888-8888"
                        {...register("phone")}
                        required
                      />
                    </div>

                    {/* Senha e Confirmar Senha */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Sua senha"
                            {...register("password")}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirme sua senha"
                          {...register("confirmPassword")}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      {plans.map((plan) => {
                        const IconComponent = plan.icon;
                        return (
                          <div
                            key={plan.id}
                            className={`
                              relative p-4 rounded-lg border-2 cursor-pointer transition-all
                              ${
                                selectedPlan === plan.id
                                  ? "border-primary bg-primary/5"
                                  : "border-gray-200 hover:border-gray-300"
                              }
                            `}
                            onClick={() => {
                              setSelectedPlan(plan.id);
                              setValue("planId", plan.id);
                            }}
                          >
                            {plan.popular && (
                              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-black">
                                Mais Popular
                              </Badge>
                            )}
                            <div className="text-center">
                              <div
                                className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
                              >
                                <IconComponent className="h-6 w-6 text-white" />
                              </div>
                              <h3 className="font-semibold text-lg text-black">
                                {plan.name}
                              </h3>
                              <div className="mt-2">
                                <span className="text-2xl font-bold text-black">
                                  {plan.price}
                                </span>
                                <span className="text-gray-600">
                                  {plan.period}
                                </span>
                              </div>
                            </div>
                            <ul className="mt-4 space-y-2">
                              {plan.features.map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-sm"
                                >
                                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                  <span className="text-gray-700">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
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

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Plano selecionado:</span>
                        <span className="font-bold">
                          {plans.find((p) => p.id === selectedPlan)?.name} -{" "}
                          {plans.find((p) => p.id === selectedPlan)?.price}/mês
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                    >
                      Voltar
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className={`${
                      step === 1 ? "w-full" : ""
                    } bg-primary hover:bg-primary/90 text-black`}
                    disabled={isRegisterLoading}
                  >
                    {step === 3
                      ? isRegisterLoading
                        ? "Finalizando..."
                        : "Finalizar Cadastro"
                      : "Continuar"}
                  </Button>
                </div>
              </form>

              {step === 1 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Já tem uma conta?{" "}
                    <Link
                      to="/login"
                      className="text-black hover:text-gray-700 font-medium"
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
