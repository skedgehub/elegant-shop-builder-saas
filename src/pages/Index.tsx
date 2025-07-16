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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  ChevronRight,
  Building2,
  Sparkles,
  Award,
  Layers,
  ChevronDown,
  CreditCard,
  ShoppingCart,
  Banknote,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PromotionalModal from "@/components/PromotionalModal";
import ResourceCard from "@/components/ResourceCard";
import InfiniteTestimonialCarousel from "@/components/InfiniteTestimonialCarousel";
import PaymentSystemSection from "@/components/PaymentSystemSection";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [scrollY, setScrollY] = useState(0);
  const [showPromotionalModal, setShowPromotionalModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Wibbo",
      "url": "https://wibbo.com",
      "sameAs": [
        "https://wibbo.com.br"
      ],
      "description": "Plataforma premium para catálogos digitais que revoluciona operações comerciais",
      "foundingDate": "2024",
      "numberOfEmployees": "50-100",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Faria Lima, 1234",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "postalCode": "01451-001",
        "addressCountry": "BR"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-11-3000-0000",
        "contactType": "customer service",
        "email": "contato@wibbo.com"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Update page title dynamically for better SEO
    document.title = "Wibbo - Plataforma Premium para Catálogos Digitais | wibbo.com";

    // Show promotional modal after 10 seconds
    const promotionalTimer = setTimeout(() => {
      setShowPromotionalModal(true);
    }, 10000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(script);
      clearTimeout(promotionalTimer);
    };
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário de contato enviado:", contactForm);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const resources = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Catálogo Digital Completo",
      description: "Crie seu catálogo profissional com subdomínio personalizado e design premium que converte visitantes em clientes.",
      features: [
        "Subdomínio exclusivo seu-negocio.wibbo.com",
        "Design responsivo e otimizado",
        "Carregamento ultra-rápido",
        "SEO otimizado automaticamente"
      ],
      badge: "Mais Popular"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Sistema de Pagamentos Integrado",
      description: "Receba pagamentos direto no seu catálogo com checkout seguro e múltiplas formas de pagamento.",
      features: [
        "PIX, cartão e boleto",
        "Checkout em 1 clique",
        "Pagamentos seguros",
        "Relatórios de vendas"
      ],
      highlight: true,
      badge: "Novo"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Avançado",
      description: "Dashboards completos para acompanhar vendas, visitantes e performance do seu catálogo em tempo real.",
      features: [
        "Vendas em tempo real",
        "Produtos mais visualizados",
        "Origem dos visitantes",
        "Relatórios customizáveis"
      ]
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Experiência Mobile Premium",
      description: "Seus clientes terão a melhor experiência de compra tanto no desktop quanto no celular.",
      features: [
        "Design 100% responsivo",
        "Navegação intuitiva",
        "Carregamento otimizado",
        "App-like experience"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Segurança Empresarial",
      description: "Infraestrutura robusta com certificados SSL, backup automático e proteção contra ataques.",
      features: [
        "SSL gratuito",
        "Backup diário automático",
        "Proteção DDoS",
        "Uptime 99.9%"
      ]
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Suporte Especializado",
      description: "Time de especialistas dedicado ao seu sucesso, com onboarding personalizado e suporte prioritário.",
      features: [
        "Onboarding personalizado",
        "Suporte via WhatsApp",
        "Consultoria de vendas",
        "Treinamento completo"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Eduardo Monteiro",
      company: "Fundador, TechCorp",
      content:
        "Implementamos a plataforma e em 2 meses nossas vendas online cresceram 400%. O sistema de pagamentos integrado foi um divisor de águas.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Marina Silva",
      company: "CEO, ModaStyle",
      content:
        "Nossos clientes adoraram o novo catálogo. As vendas aumentaram 250% e agora recebemos elogios sobre a experiência de compra.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Ricardo Santos",
      company: "Diretor, SportsPro",
      content:
        "ROI excepcional! Em 30 dias já tínhamos recuperado o investimento. A plataforma se pagou sozinha.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Ana Costa",
      company: "Fundadora, FoodDelivery",
      content:
        "Passamos a vender online sem complicação. O sistema de pagamentos funciona perfeitamente e nossos clientes aprovaram.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Carlos Mendes",
      company: "CTO, InnovaTech",
      content:
        "Implementação rápida e resultados imediatos. Nossa conversão aumentou 300% no primeiro trimestre.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Sofia Rodrigues",
      company: "Head Digital, LuxBrand",
      content:
        "A qualidade da plataforma reflete perfeitamente o padrão premium da nossa marca. Nossos clientes percebem a diferença.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Fernando Lima",
      company: "CEO, RetailPro",
      content:
        "Transformação digital completa. Nossos clientes agora têm uma experiência de compra superior e isso reflete nas vendas.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Beatriz Santos",
      company: "Diretora, EleganceStore",
      content:
        "A solução perfeita para quem busca excelência. Performance, design e funcionalidade em perfeita harmonia.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
    },
  ];

  // Duplicate testimonials for infinite scroll
  const allTestimonials = [...testimonials, ...testimonials];

  const brands = [
    {
      name: "TechCorp",
      logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=120&h=60&fit=crop",
    },
    {
      name: "ModaStyle",
      logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=120&h=60&fit=crop",
    },
    {
      name: "SportsPro",
      logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=120&h=60&fit=crop",
    },
    {
      name: "FoodDelivery",
      logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=120&h=60&fit=crop",
    },
    {
      name: "InnovaTech",
      logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=120&h=60&fit=crop",
    },
    {
      name: "LuxBrand",
      logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=120&h=60&fit=crop",
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "R$ 497",
      period: "/mês",
      description: "Ideal para começar a vender online",
      features: [
        "Até 1.000 produtos",
        "Catálogo personalizado",
        "Pagamentos integrados",
        "Suporte por email",
        "5GB de armazenamento",
      ],
      highlight: false,
    },
    {
      name: "Professional",
      price: "R$ 997",
      period: "/mês",
      description: "Para empresas em crescimento",
      features: [
        "Produtos ilimitados",
        "Domínio personalizado",
        "Analytics avançado",
        "Suporte prioritário",
        "50GB de armazenamento",
        "Integração API",
        "Sistema completo de vendas",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "R$ 2.997",
      period: "/mês",
      description: "Para grandes operações",
      features: [
        "Recursos Professional +",
        "Múltiplas lojas",
        "Consultoria dedicada",
        "SLA garantido",
        "Armazenamento ilimitado",
        "Integrações customizadas",
        "Onboarding especializado",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden relative">
      {/* Enhanced Header */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">W</span>
              </div>
              <h1 className="text-xl font-semibold text-black tracking-tight">
                Wibbo
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-black transition-colors text-sm font-medium">
                  Recursos
                  <ChevronDown className="ml-1 h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full">
                      Catálogo Digital
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full">
                      Sistema de Pagamentos
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full">
                      Analytics Avançado
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full">
                      Suporte Especializado
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <a
                href="#cases"
                className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
              >
                Cases de Sucesso
              </a>
              <a
                href="#precos"
                className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
              >
                Preços
              </a>

              <div className="flex items-center space-x-3 ml-8">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-black"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-black hover:bg-gray-900 text-white px-6"
                  >
                    Começar Agora
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
            <div className="md:hidden mt-6 pb-6 border-t border-gray-100 animate-fade-in">
              <div className="flex flex-col space-y-4 pt-6">
                <a
                  href="#recursos"
                  className="text-gray-600 hover:text-black transition-colors px-4 py-2"
                >
                  Recursos
                </a>
                <a
                  href="#cases"
                  className="text-gray-600 hover:text-black transition-colors px-4 py-2"
                >
                  Cases de Sucesso
                </a>
                <a
                  href="#precos"
                  className="text-gray-600 hover:text-black transition-colors px-4 py-2"
                >
                  Preços
                </a>
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-100">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      size="sm"
                      className="w-full bg-black hover:bg-gray-900 text-white"
                    >
                      Começar Agora
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-6 relative z-10">
        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <Badge className="mb-8 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 transition-colors">
            <Sparkles className="h-3 w-3 mr-2" />
            Plataforma líder em catálogos digitais no Brasil
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-black mb-8 leading-tight tracking-tight px-2">
            Venda mais com seu
            <span className="block font-semibold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent p-2">
              catálogo digital
            </span>
            profissional
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed font-light px-4">
            Crie seu catálogo online completo com sistema de pagamentos integrado e comece a vender em minutos. Mais de 10.000 empresas já transformaram suas vendas.
          </p>

          {/* Enhanced Stats Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
            {[
              {
                icon: <TrendingUp className="h-5 w-5" />,
                value: "+350%",
                label: "Aumento médio em vendas",
              },
              {
                icon: <Building2 className="h-5 w-5" />,
                value: "+10.000",
                label: "Empresas transformadas",
              },
              {
                icon: <CreditCard className="h-5 w-5" />,
                value: "R$ 50M+",
                label: "Processado em vendas",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 group transform-gpu"
                style={{
                  transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                }}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-semibold text-black mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-black hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all group"
              >
                Começar a Vender Agora
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 border-gray-300 hover:bg-gray-50 group"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Ver Demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 px-6 bg-gray-50/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm text-gray-600 font-medium mb-8">
              Empresas que já transformaram suas vendas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="recursos" className="py-24 px-6 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Tudo que você precisa para
              <span className="block font-semibold">vender online</span>
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Ferramentas completas para transformar sua operação em uma máquina de vendas
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {resources.map((resource, index) => (
              <ResourceCard
                key={index}
                icon={resource.icon}
                title={resource.title}
                description={resource.description}
                features={resource.features}
                highlight={resource.highlight}
                badge={resource.badge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Payment System Section */}
      <PaymentSystemSection />

      {/* Testimonials Section */}
      <section id="cases" className="py-24 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Resultados reais de quem
              <span className="block font-semibold">já transformou</span>
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Empresas que multiplicaram suas vendas com nossa plataforma
            </p>
          </div>

          <InfiniteTestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-24 px-6 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Planos que cabem no seu
              <span className="block font-semibold">orçamento</span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio e comece a vender hoje mesmo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`border transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? "border-primary shadow-lg scale-105 bg-white"
                    : "border-gray-200 bg-white shadow-sm hover:shadow-lg"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  {plan.highlight && (
                    <Badge className="w-fit mx-auto mb-4 bg-primary text-black">
                      Mais Escolhido
                    </Badge>
                  )}
                  <CardTitle className="text-xl font-semibold text-black">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 font-light">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-light text-black">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 font-light">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm"
                      >
                        <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-light">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/register">
                    <Button
                      className={`w-full ${
                        plan.highlight
                          ? "bg-black hover:bg-gray-900 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-black"
                      }`}
                    >
                      Escolher Plano
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 px-6 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Pronto para aumentar suas vendas?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Fale com nossos especialistas e descubra como multiplicar seus resultados
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact Form */}
            <Card className="border border-gray-100 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-black font-semibold">
                  Solicitar Demonstração Gratuita
                </CardTitle>
                <CardDescription className="font-light">
                  Preencha os dados e nossa equipe entrará em contato em até 2 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Nome
                      </Label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        required
                        className="border-gray-200 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        required
                        className="border-gray-200 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      WhatsApp
                    </Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="border-gray-200 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Conte sobre seu negócio
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Que tipo de produtos você vende? Quantos produtos tem?"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      required
                      className="border-gray-200 focus:border-primary"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-900 text-white py-6"
                  >
                    Solicitar Demonstração Gratuita
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-black mb-8">
                  Fale conosco agora
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
                      <Phone className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Telefone</h4>
                      <p className="text-gray-600">(11) 3000-0000</p>
                      <p className="text-sm text-gray-500">
                        Segunda a sexta, 9h às 18h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
                      <Mail className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Email</h4>
                      <p className="text-gray-600">contato@wibbo.com</p>
                      <p className="text-sm text-gray-500">
                        Resposta em até 2 horas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Endereço</h4>
                      <p className="text-gray-600">
                        Av. Faria Lima, 1234
                        <br />
                        São Paulo, SP - 01451-001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Comece hoje mesmo
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto font-light">
            Junte-se a mais de 10.000 empresas que já transformaram suas vendas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-primary hover:bg-primary/90 text-black shadow-xl"
              >
                Criar Meu Catálogo Grátis
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 text-white border-white hover:bg-white hover:text-black"
              >
                Ver Demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 px-6 border-t border-gray-100">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">W</span>
                </div>
                <span className="text-xl font-semibold text-black tracking-tight">
                  Wibbo
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed font-light">
                Plataforma líder em catálogos digitais para empresas que querem vender mais online
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-black">Produto</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#recursos"
                    className="hover:text-black transition-colors font-light"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#cases"
                    className="hover:text-black transition-colors font-light"
                  >
                    Cases de Sucesso
                  </a>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-black transition-colors font-light"
                  >
                    Demonstração
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-black">Suporte</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light"
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a
                    href="#contato"
                    className="hover:text-black transition-colors font-light"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light"
                  >
                    Status do Sistema
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-black">Empresa</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light"
                  >
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light"
                  >
                    Privacidade
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light"
                  >
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-16 pt-8 text-center text-gray-500">
            <p className="font-light">
              &copy; 2024 Wibbo - Todos os direitos reservados. Transformando negócios em máquinas de vendas.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a href="#contato" aria-label="Falar conosco">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-black shadow-lg hover:shadow-xl rounded-full p-4 group"
          >
            <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </Button>
        </a>
      </div>

      {/* Promotional Modal */}
      <PromotionalModal
        isOpen={showPromotionalModal}
        onClose={() => setShowPromotionalModal(false)}
      />
    </div>
  );
};

export default Index;
