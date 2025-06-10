import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Check,
  Star,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Palette,
  Smartphone,
  Menu,
  ArrowRight,
  Play,
  TrendingUp,
  Users,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ShoppingCart,
  Package,
  Heart,
  ShoppingBag,
  CreditCard,
  Gift,
  Sparkles,
  Coins,
  Tag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário de contato enviado:", contactForm);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Subdomínio Personalizado",
      description: "Configure seu próprio subdomínio como minhaloja.catalogo.com.br",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Customização Total",
      description: "Personalize cores, layout e campos dos seus produtos",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Dashboard Completo",
      description: "Visualize vendas, produtos mais acessados e estatísticas",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile First",
      description: "Design responsivo que funciona perfeitamente em qualquer dispositivo",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Segurança Total",
      description: "Seus dados protegidos com criptografia de ponta",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance",
      description: "Carregamento ultra-rápido para melhor experiência do cliente",
    },
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
        "Campos personalizados básicos",
      ],
      popular: false,
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
        "Backup automático",
      ],
      popular: true,
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
        "Consultor dedicado",
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      company: "Loja da Maria",
      content: "Aumentamos nossas vendas em 300% após migrar para o CatalogoPro. A facilidade de uso é incrível!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "João Santos",
      company: "TechStore",
      content: "O melhor sistema de catálogo que já usei. O suporte é excepcional e as funcionalidades são completas.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Ana Costa",
      company: "Moda & Estilo",
      content: "Interface moderna e intuitiva. Nossos clientes adoraram a nova experiência de compra.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden relative">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Shopping icons floating animation - More variety */}
        <div className="absolute top-20 left-10 w-8 h-8 text-primary/10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <ShoppingCart className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-20 w-6 h-6 text-primary/10 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <Package className="w-full h-full" />
        </div>
        <div className="absolute top-96 left-1/4 w-7 h-7 text-primary/10 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>
          <Star className="w-full h-full" />
        </div>
        <div className="absolute bottom-96 right-1/3 w-5 h-5 text-primary/10 animate-bounce" style={{ animationDelay: '3s', animationDuration: '3.5s' }}>
          <Heart className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-1/3 w-6 h-6 text-primary/10 animate-bounce" style={{ animationDelay: '4s', animationDuration: '4.5s' }}>
          <TrendingUp className="w-full h-full" />
        </div>
        
        {/* Additional shopping icons for more life */}
        <div className="absolute top-60 left-1/5 w-6 h-6 text-primary/10 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.8s' }}>
          <ShoppingBag className="w-full h-full" />
        </div>
        <div className="absolute top-80 right-1/5 w-5 h-5 text-primary/10 animate-bounce" style={{ animationDelay: '2.3s', animationDuration: '4.2s' }}>
          <CreditCard className="w-full h-full" />
        </div>
        <div className="absolute bottom-60 left-1/6 w-7 h-7 text-primary/10 animate-bounce" style={{ animationDelay: '3.7s', animationDuration: '3.3s' }}>
          <Gift className="w-full h-full" />
        </div>
        <div className="absolute bottom-80 right-1/4 w-6 h-6 text-primary/10 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '4.8s' }}>
          <Coins className="w-full h-full" />
        </div>
        <div className="absolute top-1/3 left-1/2 w-5 h-5 text-primary/10 animate-bounce" style={{ animationDelay: '4.5s', animationDuration: '3.7s' }}>
          <Tag className="w-full h-full" />
        </div>
        
        {/* Enhanced sparkle effects with more variety */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '6s' }}></div>
        <div className="absolute top-1/6 left-1/2 w-1 h-1 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/5 right-1/2 w-1.5 h-1.5 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-1/2 right-1/6 w-1 h-1 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: '7s' }}></div>
        
        {/* Floating sparkles with different colors */}
        <div className="absolute top-1/8 left-1/8 w-8 h-8 text-yellow-400/15 animate-pulse" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute bottom-1/8 right-1/8 w-6 h-6 text-blue-400/15 animate-pulse" style={{ animationDelay: '3s', animationDuration: '3.5s' }}>
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute top-1/2 left-1/8 w-7 h-7 text-purple-400/15 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4s' }}>
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute bottom-1/2 right-1/8 w-5 h-5 text-pink-400/15 animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '3s' }}>
          <Sparkles className="w-full h-full" />
        </div>
        
        {/* Enhanced glowing orbs with varied timing */}
        <div className="absolute top-1/6 left-1/6 w-32 h-32 bg-gradient-to-r from-primary/5 to-blue-400/5 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/6 right-1/6 w-40 h-40 bg-gradient-to-r from-purple-400/5 to-primary/5 rounded-full blur-xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/12 w-28 h-28 bg-gradient-to-r from-yellow-400/4 to-orange-400/4 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/12 w-36 h-36 bg-gradient-to-r from-green-400/4 to-blue-400/4 rounded-full blur-xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '3s' }}></div>
        
        {/* Moving gradient lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

      {/* Floating Contact Button */}
      <a
        href="#contact"
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-black p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Header with glassmorphism */}
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <span className="text-black font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold text-black">CatalogoPro</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50 text-black">
                      Funcionalidades
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[500px] bg-white/95 backdrop-blur-xl shadow-xl rounded-lg border border-white/20">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-black uppercase tracking-wide">
                              Recursos Principais
                            </h4>
                            <a
                              href="#features"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50"
                            >
                              <div className="text-sm font-medium leading-none flex items-center">
                                <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                                Dashboard Analytics
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-gray-600">
                                Acompanhe suas vendas em tempo real
                              </p>
                            </a>
                            <a
                              href="#features"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50"
                            >
                              <div className="text-sm font-medium leading-none flex items-center">
                                <Palette className="h-4 w-4 mr-2 text-primary" />
                                Customização
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-gray-600">
                                Personalize sua loja do seu jeito
                              </p>
                            </a>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-black uppercase tracking-wide">
                              Integração
                            </h4>
                            <a
                              href="#features"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50"
                            >
                              <div className="text-sm font-medium leading-none flex items-center">
                                <Globe className="h-4 w-4 mr-2 text-primary" />
                                Subdomínio Próprio
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-gray-600">
                                Configure seu endereço personalizado
                              </p>
                            </a>
                            <a
                              href="#features"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50"
                            >
                              <div className="text-sm font-medium leading-none flex items-center">
                                <Smartphone className="h-4 w-4 mr-2 text-primary" />
                                Mobile Ready
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-gray-600">
                                Otimizado para dispositivos móveis
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50 text-black">
                      Soluções
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px] bg-white/95 backdrop-blur-xl shadow-xl rounded-lg border border-white/20">
                        <div className="space-y-3">
                          <a
                            href="#pricing"
                            className="block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-gray-50 border border-gray-100"
                          >
                            <div className="text-sm font-medium leading-none flex items-center">
                              <Users className="h-4 w-4 mr-2 text-primary" />
                              Para Pequenas Empresas
                            </div>
                            <p className="text-xs leading-snug text-gray-600 mt-1">
                              Soluções acessíveis para começar seu negócio online
                            </p>
                          </a>
                          <a
                            href="#pricing"
                            className="block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-gray-50 border border-gray-100"
                          >
                            <div className="text-sm font-medium leading-none flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                              Para Empresas
                            </div>
                            <p className="text-xs leading-snug text-gray-600 mt-1">
                              Recursos avançados para escalar suas vendas
                            </p>
                          </a>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <a
                href="#pricing"
                className="text-black text-sm hover:text-gray-600 transition-colors font-medium"
              >
                Preços
              </a>
              <a
                href="#testimonials"
                className="text-black text-sm hover:text-gray-600 transition-colors font-medium"
              >
                Depoimentos
              </a>
              <a
                href="#contact"
                className="text-black text-sm hover:text-gray-600 transition-colors font-medium"
              >
                Contato
              </a>

              <div className="flex items-center space-x-3 ml-6">
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-gray-50 border-gray-300 hover:scale-105 transition-transform"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-black hover:scale-105 transition-transform">
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
            <div className="md:hidden mt-4 py-4 border-t bg-white/95 backdrop-blur-lg rounded-lg shadow-lg animate-slide-in">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-black transition-colors px-4 py-2"
                >
                  Funcionalidades
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-black transition-colors px-4 py-2"
                >
                  Preços
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-black transition-colors px-4 py-2"
                >
                  Depoimentos
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-black transition-colors px-4 py-2"
                >
                  Contato
                </a>
                <div className="flex flex-col space-y-2 px-4 pt-2 border-t">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90 text-black"
                    >
                      Começar Grátis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with parallax */}
      <section className="py-24 px-6 relative overflow-hidden z-10">
        {/* Background effects */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary/10 text-black border-primary/20 animate-fade-in">
            🚀 Novo: Campos personalizáveis para produtos
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-black mb-8 leading-tight animate-fade-in">
            O Catálogo Online que
            <span className="text-primary block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Vende Mais
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in text-center" style={{ animationDelay: '0.4s' }}>
            Crie sua loja virtual profissional em minutos. Sistema completo com
            subdomínio personalizado, dashboard avançado e total customização.{" "}
            <strong>Aumente suas vendas em até 300%!</strong>
          </p>

          {/* Stats Cards with 3D effect */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { value: "300%", label: "Aumento em vendas" },
              { value: "10k+", label: "Lojas criadas" },
              { value: "99.9%", label: "Uptime garantido" }
            ].map((stat, index) => (
              <Card 
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
                style={{ 
                  animationDelay: `${0.6 + index * 0.1}s`,
                  transform: `perspective(1000px) rotateX(5deg)`
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <Link to="/register">
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-black shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all group"
              >
                Começar Teste Grátis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-6 border-2 border-gray-300 hover:bg-gray-50 group backdrop-blur-sm hover:scale-105 transition-all"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Ver Demo
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex flex-col items-center animate-fade-in" style={{ animationDelay: '1.1s' }}>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Confiado por empresas de todos os tamanhos
            </p>
            <div className="flex items-center space-x-8 opacity-60">
              {["TechCorp", "ModaStyle", "FoodDelivery", "SportsPro"].map((company, index) => (
                <div 
                  key={company}
                  className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
                  style={{
                    animation: `fade-in 0.6s ease-out ${1.2 + index * 0.1}s both`
                  }}
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with scroll animations */}
      <section id="features" className="py-24 px-6 bg-gray-50 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 text-center">
              Tudo que você precisa para
              <span className="text-primary block">
                vender online
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              Recursos profissionais para criar a loja dos seus sonhos
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.1}s both`,
                  transform: `perspective(1000px) rotateY(${index % 2 === 0 ? '2deg' : '-2deg'})`
                }}
              >
                <CardHeader>
                  <div className="h-14 w-14 bg-primary rounded-xl mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 flex items-center justify-center text-black">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-black group-hover:text-primary transition-colors text-center">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with glassmorphism */}
      <section id="pricing" className="py-24 px-6 bg-white relative overflow-hidden z-10">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 text-center">
              Planos que crescem com
              <span className="text-primary block">
                seu negócio
              </span>
            </h2>
            <p className="text-xl text-gray-600 text-center">
              Escolha o plano ideal para sua empresa
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 ${
                  plan.popular
                    ? "border-2 border-primary shadow-2xl scale-105 bg-white/90 backdrop-blur-sm"
                    : "border border-gray-200 bg-white/80 backdrop-blur-sm hover:shadow-2xl"
                }`}
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.2}s both`,
                  transform: `perspective(1000px) rotateY(${index === 1 ? '0deg' : index === 0 ? '3deg' : '-3deg'})`
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-yellow-400"></div>
                )}
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-black shadow-lg z-20">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="h-16 w-16 bg-primary rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg hover:rotate-12 transition-transform duration-300">
                    <span className="text-black font-bold text-xl">
                      {plan.name[0]}
                    </span>
                  </div>
                  <CardTitle className="text-2xl text-black text-center">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-center">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6 text-center">
                    <span className="text-5xl font-bold text-black">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 text-lg">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-8 transition-all duration-300 hover:scale-105 ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 text-black shadow-lg"
                        : "bg-black hover:bg-gray-800 text-white"
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
      <section id="testimonials" className="py-24 px-6 bg-gray-50 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 text-center">
              O que nossos
              <span className="text-primary block">
                clientes dizem
              </span>
            </h2>
            <p className="text-xl text-gray-600 text-center">Histórias reais de sucesso</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 overflow-hidden"
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.2}s both`,
                  transform: `perspective(1000px) rotateX(5deg)`
                }}
              >
                <CardContent className="pt-8 text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-primary fill-current animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 italic text-lg leading-relaxed text-center">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mr-4 object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="text-center">
                      <p className="font-semibold text-black">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with glassmorphism */}
      <section id="contact" className="py-24 px-6 bg-white relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              Tem dúvidas? Nossa equipe está pronta para ajudar você a começar
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-black">Envie uma Mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário e entraremos em contato em breve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone (opcional)</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Como podemos ajudar você?"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="backdrop-blur-sm"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black hover:scale-105 transition-transform">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">
                  Outras formas de contato
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary rounded-lg p-3 flex-shrink-0 hover:rotate-12 transition-transform duration-300">
                      <Phone className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Telefone</h4>
                      <p className="text-gray-600">(11) 3000-0000</p>
                      <p className="text-sm text-gray-500">Segunda a sexta, 9h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary rounded-lg p-3 flex-shrink-0 hover:rotate-12 transition-transform duration-300">
                      <Mail className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Email</h4>
                      <p className="text-gray-600">contato@catalogopro.com</p>
                      <p className="text-sm text-gray-500">Resposta em até 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary rounded-lg p-3 flex-shrink-0 hover:rotate-12 transition-transform duration-300">
                      <MapPin className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Endereço</h4>
                      <p className="text-gray-600">
                        Rua das Startups, 123<br />
                        São Paulo, SP - 01234-567
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-gray-50/80 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-black mb-3">
                    Horário de Atendimento
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Segunda a Sexta</span>
                      <span className="text-black font-medium">9h às 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sábado</span>
                      <span className="text-black font-medium">9h às 14h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domingo</span>
                      <span className="text-black font-medium">Fechado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with 3D effect */}
      <section className="py-24 px-6 bg-black text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Crie sua loja online profissional em poucos minutos
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/register">
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-black shadow-xl hover:scale-105 transition-all duration-300"
              >
                Começar Teste Grátis
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white hover:text-black shadow-xl backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                Acessar Dashboard Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer with glassmorphism */}
      <footer className="bg-black/90 backdrop-blur-lg text-white py-16 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                  <span className="text-black font-bold text-lg">C</span>
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
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Preços
                  </a>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Suporte</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Empresa</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                    Termos
                  </a>
                </li>
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
