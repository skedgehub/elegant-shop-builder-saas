
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Check, Star, Zap, Shield, Globe, BarChart3, Palette, Smartphone, Menu, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Subdomínio Personalizado",
      description: "Configure seu próprio subdomínio como minhaloja.catalogo.com.br",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Customização Total",
      description: "Personalize cores, layout e campos dos seus produtos",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Dashboard Completo",
      description: "Visualize vendas, produtos mais acessados e estatísticas",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile First",
      description: "Design responsivo que funciona perfeitamente em qualquer dispositivo",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Segurança Total",
      description: "Seus dados protegidos com criptografia de ponta",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance",
      description: "Carregamento ultra-rápido para melhor experiência do cliente",
      color: "from-yellow-500 to-orange-500"
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
      popular: false,
      color: "from-blue-500 to-cyan-500"
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
      popular: true,
      color: "from-purple-500 to-pink-500"
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
      popular: false,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      company: "Loja da Maria",
      content: "Aumentamos nossas vendas em 300% após migrar para o CatalogoPro. A facilidade de uso é incrível!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "João Santos",
      company: "TechStore",
      content: "O melhor sistema de catálogo que já usei. O suporte é excepcional e as funcionalidades são completas.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Ana Costa",
      company: "Moda & Estilo",
      content: "Interface moderna e intuitiva. Nossos clientes adoraram a nova experiência de compra.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                CatalogoPro
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100">
                      Funcionalidades
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px] bg-white shadow-xl rounded-lg border">
                        <div className="row-span-3">
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500/20 to-blue-600/20 p-6 no-underline outline-none focus:shadow-md"
                            href="#features"
                          >
                            <Zap className="h-6 w-6 text-purple-600" />
                            <div className="mb-2 mt-4 text-lg font-medium text-gray-900">
                              Recursos Completos
                            </div>
                            <p className="text-sm leading-tight text-gray-600">
                              Descubra todas as funcionalidades do CatalogoPro
                            </p>
                          </a>
                        </div>
                        <a
                          href="#features"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Dashboard Analytics</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Acompanhe suas vendas em tempo real
                          </p>
                        </a>
                        <a
                          href="#features"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Customização</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Personalize sua loja do seu jeito
                          </p>
                        </a>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100">
                      Soluções
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[300px] bg-white shadow-xl rounded-lg border">
                        <a href="#pricing" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent">
                          <div className="text-sm font-medium leading-none">Para Pequenas Empresas</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            Soluções acessíveis para começar
                          </p>
                        </a>
                        <a href="#pricing" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent">
                          <div className="text-sm font-medium leading-none">Para Empresas</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            Recursos avançados para crescer
                          </p>
                        </a>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">Preços</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">Depoimentos</a>
              
              <div className="flex items-center space-x-3 ml-6">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="hover:bg-primary-50 hover:border-primary-300">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 shadow-lg">
                    Começar Grátis
                  </Button>
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t bg-white/95 backdrop-blur rounded-lg shadow-lg">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors px-4 py-2">Funcionalidades</a>
                <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors px-4 py-2">Preços</a>
                <a href="#testimonials" className="text-gray-600 hover:text-primary-600 transition-colors px-4 py-2">Depoimentos</a>
                <div className="flex flex-col space-y-2 px-4 pt-2 border-t">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="w-full">Entrar</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="w-full bg-gradient-to-r from-primary-600 to-purple-600">Começar Grátis</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="container mx-auto text-center relative">
          <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 shadow-lg">
            🚀 Novo: Campos personalizáveis para produtos
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 animate-fade-in leading-tight">
            O Catálogo Online que
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600"> Vende Mais</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Crie sua loja virtual profissional em minutos. Sistema completo com subdomínio personalizado, 
            dashboard avançado e total customização.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
            <Link to="/register">
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                Começar Teste Grátis
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-2 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50">
                Ver Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white relative">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tudo que você precisa para
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600"> vender online</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recursos profissionais para criar a loja dos seus sonhos
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
                <CardHeader className="relative">
                  <div className={`h-14 w-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900 group-hover:text-primary-600 transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="container mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Planos que crescem com
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600"> seu negócio</span>
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para sua empresa
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden ${plan.popular ? 'border-2 border-purple-500 shadow-2xl scale-105 bg-white' : 'border-gray-200 bg-white/80'} hover:shadow-2xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                )}
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4 relative">
                  <div className={`h-16 w-16 bg-gradient-to-br ${plan.color} rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-xl">{plan.name[0]}</span>
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 text-lg">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-8 ${plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                    }`}
                  >
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              O que nossos 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600"> clientes dizem</span>
            </h2>
            <p className="text-xl text-gray-600">
              Histórias reais de sucesso
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="pt-8">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Crie sua loja online profissional em poucos minutos
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-10 py-6 bg-white text-gray-900 hover:bg-gray-100 shadow-xl">
                Começar Teste Grátis
              </Button>
            </Link>
            <Link to="/admin">
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white hover:text-primary-600 shadow-xl">
                Acessar Dashboard Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-10 w-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-2xl font-bold">CatalogoPro</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                O sistema de catálogo mais completo e moderno do Brasil
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Produto</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Preços</a></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Suporte</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Empresa</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CatalogoPro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
