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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário de contato enviado:", contactForm);
    // Aqui você implementaria o envio do formulário
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Subdomínio Personalizado",
      description:
        "Configure seu próprio subdomínio como minhaloja.catalogo.com.br",
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
      description:
        "Design responsivo que funciona perfeitamente em qualquer dispositivo",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Segurança Total",
      description: "Seus dados protegidos com criptografia de ponta",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance",
      description:
        "Carregamento ultra-rápido para melhor experiência do cliente",
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
      content:
        "Aumentamos nossas vendas em 300% após migrar para o CatalogoPro. A facilidade de uso é incrível!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "João Santos",
      company: "TechStore",
      content:
        "O melhor sistema de catálogo que já usei. O suporte é excepcional e as funcionalidades são completas.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Ana Costa",
      company: "Moda & Estilo",
      content:
        "Interface moderna e intuitiva. Nossos clientes adoraram a nova experiência de compra.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Floating Contact Button */}
      <a
        href="#contact"
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-black p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold text-black">
                CatalogoPro
              </span>
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
                      <div className="grid gap-3 p-6 w-[500px] bg-white shadow-xl rounded-lg border">
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
                      <div className="grid gap-3 p-6 w-[400px] bg-white shadow-xl rounded-lg border">
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
                              Soluções acessíveis para começar seu negócio
                              online
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
                    className="hover:bg-gray-50 border-gray-300"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-black">
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
            <div className="md:hidden mt-4 py-4 border-t bg-white rounded-lg shadow-lg">
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

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-black border-primary/20">
            🚀 Novo: Campos personalizáveis para produtos
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-black mb-8 leading-tight">
            O Catálogo Online que
            <span className="text-primary block">
              Vende Mais
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Crie sua loja virtual profissional em minutos. Sistema completo com
            subdomínio personalizado, dashboard avançado e total customização.{" "}
            <strong>Aumente suas vendas em até 300%!</strong>
          </p>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  300%
                </div>
                <div className="text-sm text-gray-600">Aumento em vendas</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-black mb-2">
                  10k+
                </div>
                <div className="text-sm text-gray-600">Lojas criadas</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-black mb-2">
                  99.9%
                </div>
                <div className="text-sm text-gray-600">Uptime garantido</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-black shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all group"
              >
                Começar Teste Grátis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-6 border-2 border-gray-300 hover:bg-gray-50 group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Ver Demo
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-4">
              Confiado por empresas de todos os tamanhos
            </p>
            <div className="flex items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">TechCorp</div>
              <div className="text-2xl font-bold text-gray-400">ModaStyle</div>
              <div className="text-2xl font-bold text-gray-400">
                FoodDelivery
              </div>
              <div className="text-2xl font-bold text-gray-400">SportsPro</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Tudo que você precisa para
              <span className="text-primary block">
                vender online
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recursos profissionais para criar a loja dos seus sonhos
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
              >
                <CardHeader>
                  <div className="h-14 w-14 bg-primary rounded-xl mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-black group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-24 px-6 bg-white"
      >
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Planos que crescem com
              <span className="text-primary block">
                seu negócio
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para sua empresa
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden ${
                  plan.popular
                    ? "border-2 border-primary shadow-2xl scale-105 bg-white"
                    : "border border-gray-200 bg-white"
                } hover:shadow-2xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
                )}
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-black shadow-lg">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="h-16 w-16 bg-primary rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-black font-bold text-xl">
                      {plan.name[0]}
                    </span>
                  </div>
                  <CardTitle className="text-2xl text-black">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
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
                    className={`w-full mt-8 ${
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
      <section id="testimonials" className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              O que nossos
              <span className="text-primary block">
                clientes dizem
              </span>
            </h2>
            <p className="text-xl text-gray-600">Histórias reais de sucesso</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <CardContent className="pt-8">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-primary fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mr-4 object-cover"
                    />
                    <div>
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

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tem dúvidas? Nossa equipe está pronta para ajudar você a começar
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-gray-200 shadow-lg">
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
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black">
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
                    <div className="bg-primary rounded-lg p-3 flex-shrink-0">
                      <Phone className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Telefone</h4>
                      <p className="text-gray-600">(11) 3000-0000</p>
                      <p className="text-sm text-gray-500">Segunda a sexta, 9h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary rounded-lg p-3 flex-shrink-0">
                      <Mail className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Email</h4>
                      <p className="text-gray-600">contato@catalogopro.com</p>
                      <p className="text-sm text-gray-500">Resposta em até 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary rounded-lg p-3 flex-shrink-0">
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

              <Card className="bg-gray-50 border-gray-200">
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

      {/* CTA Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Crie sua loja online profissional em poucos minutos
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-black shadow-xl"
              >
                Começar Teste Grátis
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white hover:text-black shadow-xl"
              >
                Acessar Dashboard Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
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
                    className="hover:text-white transition-colors"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Preços
                  </a>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-white transition-colors"
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
                  <a href="#" className="hover:text-white transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Empresa</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
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
