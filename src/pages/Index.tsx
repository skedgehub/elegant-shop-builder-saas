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
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { StatsCard } from "@/components/StatsCard";
import { PricingCard } from "@/components/PricingCard";

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

  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Subdomínio Personalizado",
      description:
        "Configure sua identidade digital única com subdomínio exclusivo",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Campos Inteligentes",
      description: "Personalização avançada de produtos com campos dinâmicos",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Painel Executivo",
      description: "Analytics em tempo real para decisões estratégicas",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Tecnologia Escalável",
      description: "Infraestrutura robusta que cresce com seu negócio",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Suporte Premium",
      description: "Atendimento especializado e consultoria dedicada",
    },
    {
      icon: <Zap className="h-6 w-6" />,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-inter overflow-x-hidden relative">
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
                <Link to="/register" title="Solicitar acesso">
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
              aria-label="Menu mobile"
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
                  <Link to="/register" title="Solicitar acesso">
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
      <section className="pt-20 pb-32 px-6 relative z-10 bg-gradient-to-br from-gray-50 via-white to-primary/5">
        <div className="container mx-auto text-center relative z-10 max-w-6xl">
          <Badge className="mb-10 bg-white/80 text-gray-700 border-gray-200 hover:bg-white transition-colors shadow-md">
            <Sparkles className="h-3 w-3 mr-2" />
            Tecnologia para marcas que lideram
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-black mb-10 leading-tight tracking-tight px-2">
            Transforme sua
            <span className="block font-semibold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent p-2">
              operação digital
            </span>
            com catálogos premium
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-20 max-w-4xl mx-auto leading-relaxed font-light px-4">
            A plataforma líder em catálogos digitais do Brasil. Performance,
            personalização e exclusividade para empresas que buscam excelência.
          </p>

          {/* Enhanced Stats Cards with SEO content */}
          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto mb-20">
            <StatsCard
              icon={<TrendingUp className="h-6 w-6" />}
              value="+300%"
              label="Performance média"
              index={0}
              scrollY={scrollY}
            />
            <StatsCard
              icon={<Building2 className="h-6 w-6" />}
              value="+10.000"
              label="Lojas ativas"
              index={1}
              scrollY={scrollY}
            />
            <StatsCard
              icon={<Shield className="h-6 w-6" />}
              value="99.9%"
              label="Uptime garantido"
              index={2}
              scrollY={scrollY}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" title="Solicitar acesso exclusivo">
              <Button
                size="lg"
                className="text-lg px-10 py-8 bg-black hover:bg-gray-900 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all group"
              >
                Solicitar Acesso Exclusivo
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/admin" title="Demonstração">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-8 text-black border-gray-300 hover:bg-gray-50 group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Explorar Demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section with SEO content */}
      <section className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm text-gray-600 font-medium mb-12">
              Marcas que confiam na nossa tecnologia
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-60">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with SEO optimization */}
      <section id="recursos" className="py-32 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-24 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-light text-black mb-8 tracking-tight">
              Tecnologia que faz a
              <span className="block font-semibold">diferença</span>
            </h2>
            <p className="text-2xl text-gray-600 font-light">
              Recursos desenvolvidos para marcas que não aceitam o comum - exclusivos da nossa plataforma
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
                scrollY={scrollY}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with SEO content */}
      <section id="cases" className="py-32 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-black mb-8 tracking-tight">
              Resultados que
              <span className="block font-semibold">falam por si</span>
            </h2>
            <p className="text-2xl text-gray-600 font-light">
              Cases reais de marcas que escolheram a nossa excelência
            </p>
          </div>

          {/* Infinite Scroll Container */}
          <div className="relative overflow-hidden">
            <div
              className="flex animate-scroll space-x-8"
              style={{
                animation: "scroll 50s linear infinite",
                width: "fit-content",
              }}
            >
              {allTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with SEO optimization */}
      <section id="precos" className="py-32 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-black mb-8 tracking-tight">
              Investimento em
              <span className="block font-semibold">excelência</span>
            </h2>
            <p className="text-2xl text-gray-600 font-light max-w-3xl mx-auto">
              Planos desenvolvidos para diferentes estágios do seu crescimento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with SEO content */}
      <section id="contato" className="py-32 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-black mb-8 tracking-tight">
              Transforme sua marca
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Entre em contato e descubra como elevar sua operação digital
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border border-gray-100 bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-black font-semibold text-2xl">
                  Solicitar Consulta
                </CardTitle>
                <CardDescription className="font-light text-lg">
                  Preencha os dados e nossa equipe entrará em contato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-base font-medium">
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
                        className="border-gray-200 focus:border-primary py-6 text-base"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-base font-medium">
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
                        className="border-gray-200 focus:border-primary py-6 text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-base font-medium">
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
                      className="border-gray-200 focus:border-primary py-6 text-base"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-base font-medium">
                      Mensagem
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Conte-nos sobre seu projeto"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      required
                      className="border-gray-200 focus:border-primary text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-900 text-white py-8 text-lg"
                  >
                    Enviar Solicitação
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h3 className="text-3xl font-semibold text-black mb-12">
                  Outras formas de contato
                </h3>
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-gray-50 rounded-xl p-4 flex-shrink-0">
                      <Phone className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black text-lg">Telefone</h4>
                      <p className="text-gray-600 text-lg">(11) 3000-0000</p>
                      <p className="text-base text-gray-500">
                        Segunda a sexta, 9h às 18h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-gray-50 rounded-xl p-4 flex-shrink-0">
                      <Mail className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black text-lg">Email</h4>
                      <p className="text-gray-600 text-lg">contato@wibbo.com</p>
                      <p className="text-base text-gray-500">
                        Resposta em até 24h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-gray-50 rounded-xl p-4 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black text-lg">Endereço</h4>
                      <p className="text-gray-600 text-lg">
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
      <section className="py-32 px-6 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight">
            Pronto para liderar?
          </h2>
          <p className="text-2xl mb-16 opacity-90 max-w-3xl mx-auto font-light">
            Junte-se às marcas que escolheram a nossa tecnologia premium
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" title="Acesso exclusivo">
              <Button
                size="lg"
                className="text-lg px-10 py-8 bg-primary hover:bg-primary/90 text-black shadow-2xl"
              >
                Solicitar Acesso Exclusivo
              </Button>
            </Link>
            <Link to="/admin" title="Demo privada">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-8 text-white border-white hover:bg-white hover:text-black"
              >
                Explorar Demonstração Privada
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO-optimized Footer */}
      <footer className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">W</span>
                </div>
                <span className="text-xl font-semibold text-black tracking-tight">
                  Wibbo
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                Tecnologia premium para marcas que lideram
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-8 text-black text-lg">Produto</h4>
              <ul className="space-y-4 text-gray-600">
                <li>
                  <a
                    href="#recursos"
                    className="hover:text-black transition-colors font-light text-base"
                    title="Recursos"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#cases"
                    className="hover:text-black transition-colors font-light text-base"
                    title="Cases"
                  >
                    Cases
                  </a>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-black transition-colors font-light text-base"
                    title="Demo"
                  >
                    Demonstração
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-8 text-black text-lg">Suporte</h4>
              <ul className="space-y-4 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light text-base"
                    title="Central de ajuda"
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a
                    href="#contato"
                    className="hover:text-black transition-colors font-light text-base"
                    title="Contato"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light text-base"
                    title="Status"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-8 text-black text-lg">Empresa</h4>
              <ul className="space-y-4 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light text-base"
                    title="Sobre nós"
                  >
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light text-base"
                    title="Privacidade"
                  >
                    Privacidade
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition-colors font-light text-base"
                    title="Termos"
                  >
                    Termos
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-20 pt-12 text-center text-gray-500">
            <p className="font-light text-base">
              &copy; 2024 Wibbo - Todos os direitos reservados. Plataforma líder em catálogos digitais.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Contact Button with SEO */}
      <div className="fixed bottom-8 right-8 z-40">
        <a href="#contato" title="Contato" aria-label="Falar conosco">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-black shadow-2xl hover:shadow-3xl rounded-full p-6 group"
          >
            <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
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
