
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Check,
  Star,
  Globe,
  Smartphone,
  BarChart3,
  Users,
  ShoppingCart,
  Zap,
  Shield,
  HeartHandshake,
  PlayCircle,
  Quote,
  ArrowDown,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Globe,
      title: "Catálogo Online",
      description: "Crie seu catálogo digital profissional em minutos"
    },
    {
      icon: Smartphone,
      title: "100% Responsivo",
      description: "Funciona perfeitamente em celulares, tablets e desktop"
    },
    {
      icon: BarChart3,
      title: "Análises Detalhadas",
      description: "Acompanhe vendas, produtos mais vistos e muito mais"
    },
    {
      icon: Users,
      title: "Gestão de Clientes",
      description: "Organize sua base de clientes e histórico de pedidos"
    },
    {
      icon: ShoppingCart,
      title: "Carrinho de Compras",
      description: "Sistema completo de pedidos e checkout"
    },
    {
      icon: Zap,
      title: "Configuração Rápida",
      description: "Configure tudo em apenas alguns cliques"
    }
  ];

  const plans = [
    {
      name: "Básico",
      price: "R$ 29",
      period: "/mês",
      popular: false,
      features: [
        "Até 100 produtos",
        "Catálogo responsivo",
        "Carrinho de compras",
        "Suporte básico",
        "SSL gratuito"
      ]
    },
    {
      name: "Profissional",
      price: "R$ 69",
      period: "/mês",
      popular: true,
      features: [
        "Até 1000 produtos",
        "Análises avançadas",
        "Gestão de clientes",
        "Domínio personalizado",
        "Suporte prioritário",
        "Integração WhatsApp"
      ]
    },
    {
      name: "Enterprise",
      price: "R$ 149",
      period: "/mês",
      popular: false,
      features: [
        "Produtos ilimitados",
        "Multi-lojas",
        "API completa",
        "Relatórios customizados",
        "Suporte 24/7",
        "Gerente dedicado"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Proprietária da Boutique Elegance",
      content: "Aumentei minhas vendas em 300% desde que comecei a usar o CatalogoPro. A facilidade de uso é incrível!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Dono da Eletrônicos Tech",
      content: "O sistema de gestão é muito completo. Consigo acompanhar tudo em tempo real e meus clientes adoram a experiência.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Empreendedora Digital",
      content: "Simples, rápido e eficiente. Em 1 hora já tinha minha loja online funcionando perfeitamente.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CatalogoPro
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Recursos
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Preços
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                Depoimentos
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="hidden sm:inline-flex"
              >
                Entrar
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Começar Grátis
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 px-4 py-2">
              ✨ Transforme seu negócio em uma loja online profissional
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Catálogo Digital
              </span>
              <br />
              <span className="text-gray-900">que Vende</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Crie sua loja online profissional em minutos. Sistema completo com catálogo responsivo, 
              carrinho de compras e gestão inteligente para impulsionar suas vendas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg h-auto"
              >
                Criar Minha Loja Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg h-auto border-2 hover:bg-gray-50"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Ver Demonstração
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 pt-8 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>Grátis por 14 dias</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>Sem taxa de configuração</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>

          <div className={`mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-4 border border-gray-200">
                <img
                  src="/placeholder.svg"
                  alt="Dashboard Preview"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-800 border-0">Recursos</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Tudo que você precisa para vender online
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas profissionais que simplificam a gestão do seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-purple-100 text-purple-800 border-0">Depoimentos</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Mais de 10.000 empresas confiam no CatalogoPro
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-blue-500 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-green-100 text-green-800 border-0">Preços</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Planos que se adaptam ao seu negócio
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para o tamanho da sua empresa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-2 ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                    Mais Popular
                  </Badge>
                )}
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    onClick={() => navigate("/register")}
                  >
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pronto para revolucionar suas vendas?
            </h2>
            <p className="text-xl text-blue-100">
              Junte-se a milhares de empresários que já transformaram seus negócios com o CatalogoPro
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg h-auto"
              >
                Criar Minha Loja Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-blue-100 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <HeartHandshake className="h-4 w-4" />
                <span>Suporte Dedicado</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Configuração Instantânea</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold">CatalogoPro</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                A plataforma completa para criar e gerenciar seu catálogo digital profissional.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CatalogoPro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
