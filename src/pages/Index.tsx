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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Smooth scroll for navigation
    const smoothScrollTo = (elementId: string) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Add smooth scroll event listeners
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          smoothScrollTo(href.substring(1));
        }
      });
    });

    // Show promotional modal after 10 seconds
    const promotionalTimer = setTimeout(() => {
      setShowPromotionalModal(true);
    }, 10000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      links.forEach((link) => {
        link.removeEventListener("click", () => {});
      });
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
        "Com a Wibbo, nossa operação digital se transformou completamente. Crescemos 4x em vendas nos primeiros dois meses.",
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
        "A Wibbo não é apenas uma ferramenta, é uma vantagem competitiva. Resultados que falam por si.",
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
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(rgba(31,250,67,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(31,250,67,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        </div>
        
        {/* Mouse Follower Light */}
        <div 
          className="absolute pointer-events-none transition-all duration-300 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
        
        {/* Particle System */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced Header with Glass Effect */}
      <header className="border-b border-gray-800/50 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-primary to-green-400 rounded-lg flex items-center justify-center shadow-lg shadow-primary/25">
                <span className="text-black font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-semibold text-white tracking-tight">
                Wibbo
              </span>
            </div>

            {/* Desktop Navigation with Dropdown */}
            <nav className="hidden md:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-400 hover:text-primary transition-colors text-sm font-medium">
                  Recursos
                  <ChevronDown className="ml-1 h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 shadow-lg">
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full text-gray-300 hover:text-primary">
                      Visão Geral
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full text-gray-300 hover:text-primary">
                      Subdomínio Personalizado
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full text-gray-300 hover:text-primary">
                      Analytics Avançado
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#recursos" className="w-full text-gray-300 hover:text-primary">
                      Integrações
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <a
                href="#cases"
                className="text-gray-400 hover:text-primary transition-colors text-sm font-medium"
              >
                Cases
              </a>
              <a
                href="#precos"
                className="text-gray-400 hover:text-primary transition-colors text-sm font-medium"
              >
                Preços
              </a>

              <div className="flex items-center space-x-3 ml-8">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-primary border-gray-800 hover:border-primary/50"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black px-6 shadow-lg shadow-primary/25"
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
              className="md:hidden text-gray-400 hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-6 pb-6 border-t border-gray-800/50 animate-fade-in">
              <div className="flex flex-col space-y-4 pt-6">
                <a
                  href="#recursos"
                  className="text-gray-400 hover:text-primary transition-colors px-4 py-2"
                >
                  Recursos
                </a>
                <a
                  href="#cases"
                  className="text-gray-400 hover:text-primary transition-colors px-4 py-2"
                >
                  Cases
                </a>
                <a
                  href="#precos"
                  className="text-gray-400 hover:text-primary transition-colors px-4 py-2"
                >
                  Preços
                </a>
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-800/50">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="w-full border-gray-800 text-gray-300 hover:border-primary/50 hover:text-primary">
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black"
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

      {/* Enhanced Hero Section with Neon Effect */}
      <section className="pt-20 pb-32 px-6 relative z-10">
        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <Badge className="mb-8 bg-gray-900/50 text-primary border-primary/30 hover:bg-gray-800/50 transition-colors backdrop-blur-sm">
            <Sparkles className="h-3 w-3 mr-2" />
            Tecnologia para marcas que lideram
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight tracking-tight px-2">
            Transforme sua
            <span className="block font-semibold relative group cursor-pointer">
              {/* Neon Effect Text */}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-green-400 to-primary bg-clip-text text-transparent animate-pulse blur-sm">
                  operação digital
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-green-300 to-green-400 bg-clip-text text-transparent animate-pulse">
                  operação digital
                </span>
                <span className="relative bg-gradient-to-r from-primary via-green-400 to-primary bg-clip-text text-transparent">
                  operação digital
                </span>
              </span>
              
              {/* Neon Glow Effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-green-400/20 to-primary/20 blur-xl opacity-70 animate-pulse group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-green-400/30 to-primary/30 blur-lg opacity-50 animate-pulse delay-500 group-hover:opacity-80 transition-opacity"></div>
              
              {/* Animated Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-green-400 to-primary opacity-20 blur-sm rounded-lg animate-pulse delay-1000"></div>
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed font-light px-4">
            Uma plataforma premium para catálogos digitais. Performance,
            personalização e exclusividade em cada detalhe.
          </p>

          {/* Enhanced Stats Cards with Hover Effects */}
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
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 group transform-gpu cursor-pointer"
                style={{
                  transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                }}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
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
                className="text-base px-8 py-6 bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all group"
              >
                Solicitar Acesso Exclusivo
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 border-gray-800 hover:border-primary/50 text-gray-300 hover:text-primary group backdrop-blur-sm"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Explorar Demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Brands Section */}
      <section className="py-16 px-6 bg-gray-900/20 backdrop-blur-sm border-y border-gray-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-400 font-medium mb-8">
              Marcas que confiam na nossa tecnologia
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center hover:opacity-100 transition-all duration-300 transform hover:scale-110"
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

      {/* Enhanced Features Section */}
      <section id="recursos" className="py-24 px-6 bg-gray-900/10 backdrop-blur-sm relative">
        <div className="container mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              Tecnologia que faz a
              <span className="block font-semibold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">diferença</span>
            </h2>
            <p className="text-xl text-gray-300 font-light">
              Recursos desenvolvidos para marcas que não aceitam o comum
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 group transform-gpu cursor-pointer"
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.1}s both`,
                  transform: `translateY(${scrollY * 0.01 * (index + 1)}px)`,
                }}
              >
                <CardHeader className="pb-4">
                  <div className="h-12 w-12 bg-gray-800/50 rounded-xl mb-6 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center text-gray-400 group-hover:text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-white font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials with Infinite Scroll */}
      <section id="cases" className="py-24 px-6 bg-black/50 backdrop-blur-sm overflow-hidden relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              Resultados que
              <span className="block font-semibold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">falam por si</span>
            </h2>
            <p className="text-xl text-gray-300 font-light">
              Cases reais de marcas que escolheram a excelência
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
                  className="min-w-[320px] max-w-[320px] border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 flex-shrink-0 cursor-pointer"
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
                    <p className="text-gray-300 mb-6 italic text-sm leading-relaxed font-light line-clamp-3">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-400 text-xs font-medium">
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

      {/* Enhanced Pricing Section */}
      <section id="precos" className="py-24 px-6 bg-gray-900/10 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              Investimento em
              <span className="block font-semibold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">excelência</span>
            </h2>
            <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
              Planos desenvolvidos para diferentes estágios do seu crescimento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`border transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  plan.highlight
                    ? "border-primary/50 shadow-lg shadow-primary/20 scale-105 bg-gray-900/50 backdrop-blur-sm"
                    : "border-gray-800/50 bg-gray-900/30 backdrop-blur-sm hover:shadow-lg hover:border-primary/30 hover:shadow-primary/10"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  {plan.highlight && (
                    <Badge className="w-fit mx-auto mb-4 bg-gradient-to-r from-primary to-green-400 text-black">
                      Mais Popular
                    </Badge>
                  )}
                  <CardTitle className="text-xl font-semibold text-white">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400 font-light">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-light text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 font-light">
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
                        <span className="text-gray-300 font-light">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/register">
                    <Button
                      className={`w-full transition-all ${
                        plan.highlight
                          ? "bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black shadow-lg shadow-primary/25"
                          : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-primary/50"
                      }`}
                    >
                      Solicitar Acesso
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 px-6 bg-gray-900/20 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
              Transforme sua marca
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              Entre em contato e descubra como elevar sua operação digital
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact Form */}
            <Card className="border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-white font-semibold">
                  Solicitar Consulta
                </CardTitle>
                <CardDescription className="font-light text-gray-400">
                  Preencha os dados e nossa equipe entrará em contato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-300">
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
                        className="border-gray-700 bg-gray-800/50 focus:border-primary text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-300">
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
                        className="border-gray-700 bg-gray-800/50 focus:border-primary text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-300">
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
                      className="border-gray-700 bg-gray-800/50 focus:border-primary text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-300">
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
                      className="border-gray-700 bg-gray-800/50 focus:border-primary text-white placeholder:text-gray-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black py-6 shadow-lg shadow-primary/25"
                  >
                    Enviar Solicitação
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-8">
                  Outras formas de contato
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-800/50 rounded-lg p-3 flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Telefone</h4>
                      <p className="text-gray-400">(11) 3000-0000</p>
                      <p className="text-sm text-gray-500">
                        Segunda a sexta, 9h às 18h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-800/50 rounded-lg p-3 flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-gray-400">contato@wibbo.com</p>
                      <p className="text-sm text-gray-500">
                        Resposta em até 24h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-800/50 rounded-lg p-3 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Endereço</h4>
                      <p className="text-gray-400">
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

      {/* Enhanced CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(31,250,67,0.1),transparent_70%)]"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight text-white">
            Pronto para liderar?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto font-light text-gray-300">
            Junte-se às marcas que escolheram a tecnologia premium
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black shadow-xl shadow-primary/25"
              >
                Solicitar Acesso Exclusivo
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 text-gray-300 border-gray-700 hover:border-primary/50 hover:text-primary"
              >
                Explorar Demonstração Privada
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm py-16 px-6 border-t border-gray-800/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-8 w-8 bg-gradient-to-r from-primary to-green-400 rounded-lg flex items-center justify-center shadow-lg shadow-primary/25">
                  <span className="text-black font-bold text-sm">W</span>
                </div>
                <span className="text-xl font-semibold text-white tracking-tight">
                  Wibbo
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed font-light">
                Tecnologia premium para marcas que lideram
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Produto</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#recursos"
                    className="hover:text-primary transition-colors font-light"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#cases"
                    className="hover:text-primary transition-colors font-light"
                  >
                    Cases
                  </a>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-primary transition-colors font-light"
                  >
                    Demonstração
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Suporte</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors font-light"
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a
                    href="#contato"
                    className="hover:text-primary transition-colors font-light"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors font-light"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Empresa</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors font-light"
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors font-light"
                  >
                    Privacidade
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors font-light"
                  >
                    Termos
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800/50 mt-16 pt-8 text-center text-gray-500">
            <p className="font-light">
              &copy; 2024 Wibbo. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a href="#contato">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-black shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 rounded-full p-4 group"
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
