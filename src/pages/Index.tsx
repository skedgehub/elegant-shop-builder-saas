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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PromotionalModal from "@/components/PromotionalModal";

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
      "description": "Wibbo.com - Plataforma premium para catálogos digitais que revoluciona operações comerciais",
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

  const features = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Subdomínio Personalizado",
      description:
        "Configure sua identidade digital única com subdomínio exclusivo",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Campos Inteligentes",
      description: "Personalização avançada de produtos com campos dinâmicos",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Painel Executivo",
      description: "Analytics em tempo real para decisões estratégicas",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Tecnologia Escalável",
      description: "Infraestrutura robusta que cresce com seu negócio",
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Suporte Premium",
      description: "Atendimento especializado e consultoria dedicada",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Performance Otimizada",
      description:
        "Velocidade de carregamento superior para conversões máximas",
    },
  ];

  const testimonials = [
    {
      name: "Eduardo Monteiro",
      company: "Fundador, TechCorp",
      content:
        "Nossa operação digital se transformou completamente. Crescemos 4x em vendas nos primeiros dois meses.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Marina Silva",
      company: "CEO, ModaStyle",
      content:
        "A plataforma elevou nossa presença digital a um novo patamar. Performance e elegância que nossos clientes merecem.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Ricardo Santos",
      company: "Diretor, SportsPro",
      content:
        "Tecnologia de ponta que nos diferencia da concorrência. ROI excepcional desde o primeiro dia de implementação.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Ana Costa",
      company: "Fundadora, FoodDelivery",
      content:
        "Não é apenas uma ferramenta, é uma vantagem competitiva. Resultados que falam por si.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Carlos Mendes",
      company: "CTO, InnovaTech",
      content:
        "Implementação fluida e resultados imediatos. Nossa conversão aumentou 250% no primeiro trimestre.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Sofia Rodrigues",
      company: "Head Digital, LuxBrand",
      content:
        "Excelência em cada detalhe. A plataforma reflete perfeitamente a sofisticação da nossa marca.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Fernando Lima",
      company: "CEO, RetailPro",
      content:
        "Transformação digital completa. Nossos clientes agora vivem uma experiência premium em cada interação.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=80&h=80&fit=crop&crop=face",
    },
    {
      name: "Beatriz Santos",
      company: "Diretora, EleganceStore",
      content:
        "A solução perfeita para marcas que buscam excelência. Performance e design em harmonia absoluta.",
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
      description: "Para marcas em crescimento",
      features: [
        "Até 1.000 produtos",
        "Subdomínio personalizado",
        "Analytics básico",
        "Suporte por email",
        "5GB de armazenamento",
      ],
      highlight: false,
    },
    {
      name: "Professional",
      price: "R$ 997",
      period: "/mês",
      description: "Para operações consolidadas",
      features: [
        "Produtos ilimitados",
        "Domínio personalizado",
        "Analytics avançado",
        "Suporte prioritário",
        "50GB de armazenamento",
        "Integração API",
        "White-label completo",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "R$ 2.997",
      period: "/mês",
      description: "Para grandes corporações",
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
      {/* Enhanced Header with SEO-optimized navigation */}
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

            {/* Desktop Navigation with SEO-optimized links */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Menu principal">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-black transition-colors text-sm font-medium">
                  Recursos
                  <ChevronDown className="ml-1 h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full">
                      Visão Geral
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full">
                      Subdomínio Personalizado
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full">
                      Analytics Avançado
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full">
                      Integrações
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <a
                href="#cases"
                className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
                title="Cases de sucesso"
              >
                Cases
              </a>
              <a
                href="#precos"
                className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
                title="Preços da plataforma"
              >
                Preços
              </a>

              <div className="flex items-center space-x-3 ml-8">
                <Link to="/login" title="Entrar na plataforma">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-black"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/register" title="Solicitar acesso Wibbo">
                  <Button
                    size="sm"
                    className="bg-black hover:bg-gray-900 text-white px-6"
                  >
                    Solicitar Acesso
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
              aria-label="Menu mobile Wibbo"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu with SEO-optimized content */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-6 pb-6 border-t border-gray-100 animate-fade-in">
              <div className="flex flex-col space-y-4 pt-6">
                <a
                  href="#recursos"
                  className="text-gray-600 hover:text-black transition-colors px-4 py-2"
                  title="Recursos da plataforma"
                >
                  Recursos
                </a>
                <a
                  href="#cases"
                  className="text-gray-600 hover:text-black transition-colors px-4 py-2"
                  title="Cases de sucesso"
                >
                  Cases
                </a>
                <a
                  href="#precos"
                  className="text-gray-600 hover:text-black transition-colors px-4 py-2"
                  title="Preços da plataforma"
                >
                  Preços
                </a>
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-100">
                  <Link to="/login" title="Login na plataforma">
                    <Button variant="outline" size="sm" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/register" title="Solicitar acesso Wibbo">
                    <Button
                      size="sm"
                      className="w-full bg-black hover:bg-gray-900 text-white"
                    >
                      Solicitar Acesso
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* SEO-optimized Hero Section */}
      <section className="pt-16 pb-24 px-6 relative z-10">
        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <Badge className="mb-8 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 transition-colors">
            <Sparkles className="h-3 w-3 mr-2" />
            Wibbo.com - Tecnologia para marcas que lideram
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-black mb-8 leading-tight tracking-tight px-2">
            Transforme sua
            <span className="block font-semibold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent p-2">
              operação digital
            </span>
            com catálogos premium
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed font-light px-4">
            A plataforma líder em catálogos digitais do Brasil. Performance,
            personalização e exclusividade para empresas que buscam excelência.
          </p>

          {/* Enhanced Stats Cards with SEO content */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
            {[
              {
                icon: <TrendingUp className="h-5 w-5" />,
                value: "+300%",
                label: "Performance média",
              },
              {
                icon: <Building2 className="h-5 w-5" />,
                value: "+10.000",
                label: "Lojas ativas",
              },
              {
                icon: <Shield className="h-5 w-5" />,
                value: "99.9%",
                label: "Uptime garantido",
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
            <Link to="/register" title="Solicitar acesso exclusivo Wibbo.com">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-black hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all group"
              >
                Solicitar Acesso Exclusivo Wibbo
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/admin" title="Demonstração Wibbo.com.br">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 border-gray-300 hover:bg-gray-50 group"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Explorar Demonstração Wibbo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section with SEO content */}
      <section className="py-16 px-6 bg-gray-50/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm text-gray-600 font-medium mb-8">
              Marcas que confiam na tecnologia Wibbo.com
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

      {/* Features Section with SEO optimization */}
      <section id="recursos" className="py-24 px-6 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Wibbo.com - Tecnologia que faz a
              <span className="block font-semibold">diferença</span>
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Recursos desenvolvidos para marcas que não aceitam o comum - exclusivos da plataforma Wibbo
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group transform-gpu"
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.1}s both`,
                  transform: `translateY(${scrollY * 0.01 * (index + 1)}px)`,
                }}
              >
                <CardHeader className="pb-4">
                  <div className="h-12 w-12 bg-gray-50 rounded-xl mb-6 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center text-gray-700 group-hover:text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-black font-semibold group-hover:text-gray-900 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with SEO content */}
      <section id="cases" className="py-24 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Wibbo.com - Resultados que
              <span className="block font-semibold">falam por si</span>
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Cases reais de marcas que escolheram a excelência da plataforma Wibbo
            </p>
          </div>

          {/* Infinite Scroll Container */}
          <div className="relative overflow-hidden">
            <div
              className="flex animate-scroll space-x-6"
              style={{
                animation: "scroll 40s linear infinite",
                width: "fit-content",
              }}
            >
              {allTestimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="min-w-[320px] max-w-[320px] border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex-shrink-0"
                >
                  <CardContent className="pt-6 pb-6">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 text-primary fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic text-sm leading-relaxed font-light line-clamp-3">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <p className="font-semibold text-black text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-600 text-xs font-medium">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with SEO optimization */}
      <section id="precos" className="py-24 px-6 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Wibbo.com - Investimento em
              <span className="block font-semibold">excelência</span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Planos Wibbo.com.br desenvolvidos para diferentes estágios do seu crescimento
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
                      Mais Popular Wibbo
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
                  <Link to="/register" title={`Solicitar acesso ${plan.name}`}>
                    <Button
                      className={`w-full ${
                        plan.highlight
                          ? "bg-black hover:bg-gray-900 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-black"
                      }`}
                    >
                      Solicitar Acesso Wibbo
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with SEO content */}
      <section id="contato" className="py-24 px-6 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Wibbo.com - Transforme sua marca
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Entre em contato com a Wibbo e descubra como elevar sua operação digital
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact Form */}
            <Card className="border border-gray-100 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-black font-semibold">
                  Solicitar Consulta
                </CardTitle>
                <CardDescription className="font-light">
                  Preencha os dados e nossa equipe entrará em contato
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
                      Telefone
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
                      Mensagem
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Conte-nos sobre seu projeto"
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
                    Enviar Solicitação
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-black mb-8">
                  Outras formas de contato
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
                        Resposta em até 24h
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

      {/* CTA Section with SEO optimization */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Wibbo.com - Pronto para liderar?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto font-light">
            Junte-se às marcas que escolheram a tecnologia premium da Wibbo.com.br
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" title="Acesso exclusivo Wibbo">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-primary hover:bg-primary/90 text-black shadow-xl"
              >
                Solicitar Acesso Exclusivo Wibbo
              </Button>
            </Link>
            <Link to="/admin" title="Demo privada Wibbo">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 text-black"
              >
                Explorar Demonstração Privada Wibbo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO-optimized Footer */}
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
                Wibbo.com - Tecnologia premium para marcas que lideram
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-black">Produto Wibbo</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#recursos"
                    className="hover:text-black transition-colors font-light"
                    title="Recursos Wibbo.com"
                  >
                    Recursos Wibbo
                  </a>
                </li>
                <li>
                  <a
                    href="#cases"
                    className="hover:text-black transition-colors font-light"
                    title="Cases Wibbo.com"
                  >
                    Cases Wibbo
                  </a>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-black transition-colors font-light"
                    title="Demo Wibbo.com.br"
                  >
                    Demonstração Wibbo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-black">Suporte Wibbo</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light"
                    title="Central de ajuda Wibbo"
                  >
                    Central de Ajuda Wibbo
                  </a>
                </li>
                <li>
                  <a
                    href="#contato"
                    className="hover:text-black transition-colors font-light"
                    title="Contato Wibbo.com"
                  >
                    Contato Wibbo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light"
                    title="Status Wibbo.com"
                  >
                    Status Wibbo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-black">Empresa Wibbo</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light"
                    title="Sobre Wibbo.com"
                  >
                    Sobre Wibbo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light"
                    title="Privacidade Wibbo"
                  >
                    Privacidade Wibbo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light"
                    title="Termos Wibbo.com"
                  >
                    Termos Wibbo
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-16 pt-8 text-center text-gray-500">
            <p className="font-light">
              &copy; 2024 Wibbo.com - Todos os direitos reservados. Wibbo.com.br - Plataforma líder em catálogos digitais.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Contact Button with SEO */}
      <div className="fixed bottom-6 right-6 z-40">
        <a href="#contato" title="Contato Wibbo.com" aria-label="Falar com Wibbo">
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
