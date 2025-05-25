
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Shield, Globe, BarChart3, Palette, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Subdomínio Personalizado",
      description: "Configure seu próprio subdomínio como minhaloja.catalogo.com.br"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Customização Total",
      description: "Personalize cores, layout e campos dos seus produtos"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Dashboard Completo",
      description: "Visualize vendas, produtos mais acessados e estatísticas"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile First",
      description: "Design responsivo que funciona perfeitamente em qualquer dispositivo"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Segurança Total",
      description: "Seus dados protegidos com criptografia de ponta"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance",
      description: "Carregamento ultra-rápido para melhor experiência do cliente"
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "R$ 29",
      period: "/mês",
      description: "Perfeito para começar",
      features: [
        "Até 100 produtos",
        "1 subdomínio",
        "3 categorias",
        "Suporte por email",
        "Campos personalizados básicos"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "R$ 79",
      period: "/mês",
      description: "Para lojas em crescimento",
      features: [
        "Até 1.000 produtos",
        "3 subdomínios",
        "Categorias ilimitadas",
        "Suporte prioritário",
        "Campos personalizados avançados",
        "Analytics detalhado",
        "Backup automático"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "R$ 199",
      period: "/mês",
      description: "Para grandes operações",
      features: [
        "Produtos ilimitados",
        "Subdomínios ilimitados",
        "Multi-usuário",
        "Suporte 24/7",
        "API completa",
        "White label",
        "Consultor dedicado"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      company: "Loja da Maria",
      content: "Aumentamos nossas vendas em 300% após migrar para o CatalogoPro. A facilidade de uso é incrível!",
      rating: 5
    },
    {
      name: "João Santos",
      company: "TechStore",
      content: "O melhor sistema de catálogo que já usei. O suporte é excepcional e as funcionalidades são completas.",
      rating: 5
    },
    {
      name: "Ana Costa",
      company: "Moda & Estilo",
      content: "Interface moderna e intuitiva. Nossos clientes adoraram a nova experiência de compra.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CatalogoPro</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Recursos</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Preços</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary-600 transition-colors">Depoimentos</a>
              <Button variant="outline" size="sm">Entrar</Button>
              <Button size="sm">Começar Grátis</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-primary-100 text-primary-700 border-primary-200">
            🚀 Novo: Campos personalizáveis para produtos
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            O Catálogo Online que
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600"> Vende Mais</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Crie sua loja virtual profissional em minutos. Sistema completo com subdomínio personalizado, 
            dashboard avançado e total customização.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" className="text-lg px-8 py-6">
              Começar Teste Grátis
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para vender online
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recursos profissionais para criar a loja dos seus sonhos
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planos que crescem com seu negócio
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para sua empresa
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary-500 shadow-2xl scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"}>
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600">
              Histórias reais de sucesso
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Crie sua loja online profissional em poucos minutos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Começar Teste Grátis
            </Button>
            <Link to="/admin">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary-600">
                Acessar Dashboard Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold">CatalogoPro</span>
              </div>
              <p className="text-gray-400">
                O sistema de catálogo mais completo do Brasil
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
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
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
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
