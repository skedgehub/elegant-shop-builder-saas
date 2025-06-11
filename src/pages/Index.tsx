
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
  ChevronRight,
  Building2,
  Sparkles,
  Award,
  Layers,
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
      icon: <Globe className="h-5 w-5" />,
      title: "Subdomínio Personalizado",
      description: "Configure sua identidade digital única com subdomínio exclusivo",
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
      description: "Velocidade de carregamento superior para conversões máximas",
    },
  ];

  const testimonials = [
    {
      name: "Eduardo Monteiro",
      company: "Fundador, TechCorp",
      content: "Com a CatalogoPro, nossa operação digital se transformou completamente. Crescemos 4x em vendas nos primeiros dois meses.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Marina Silva",
      company: "CEO, ModaStyle",
      content: "A plataforma elevou nossa presença digital a um novo patamar. Performance e elegância que nossos clientes merecem.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Ricardo Santos",
      company: "Diretor, SportsPro",
      content: "Tecnologia de ponta que nos diferencia da concorrência. ROI excepcional desde o primeiro dia de implementação.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Ana Costa",
      company: "Fundadora, FoodDelivery",
      content: "A CatalogoPro não é apenas uma ferramenta, é uma vantagem competitiva. Resultados que falam por si.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  // Duplicate testimonials for infinite scroll
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden relative">
      {/* Minimalist Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle geometric shapes */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-primary/5 rounded-full"></div>
        <div className="absolute top-40 left-10 w-1 h-1 bg-gray-200 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-1.5 h-1.5 bg-primary/8 rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-20 bg-gray-100"></div>
        <div className="absolute bottom-1/4 right-1/5 w-32 h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
      </div>

      {/* Clean Header */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-semibold text-black tracking-tight">CatalogoPro</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#recursos" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
                Recursos
              </a>
              <a href="#cases" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
                Cases
              </a>
              <a href="#investimento" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
                Investimento
              </a>

              <div className="flex items-center space-x-3 ml-8">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-black hover:bg-gray-900 text-white px-6">
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
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-6 pb-6 border-t border-gray-100 animate-fade-in">
              <div className="flex flex-col space-y-4 pt-6">
                <a href="#recursos" className="text-gray-600 hover:text-black transition-colors px-4 py-2">
                  Recursos
                </a>
                <a href="#cases" className="text-gray-600 hover:text-black transition-colors px-4 py-2">
                  Cases
                </a>
                <a href="#investimento" className="text-gray-600 hover:text-black transition-colors px-4 py-2">
                  Investimento
                </a>
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-100">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="w-full bg-black hover:bg-gray-900 text-white">
                      Solicitar Acesso
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6 relative z-10">
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <Badge className="mb-8 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 transition-colors">
            <Sparkles className="h-3 w-3 mr-2" />
            Tecnologia para marcas que lideram
          </Badge>

          <h1 className="text-5xl md:text-7xl font-light text-black mb-8 leading-tight tracking-tight">
            Transforme sua
            <span className="block font-semibold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              operação digital
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
            Uma plataforma premium para catálogos digitais. Performance, personalização e 
            exclusividade em cada detalhe.
          </p>

          {/* Premium Stats Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
            {[
              { icon: <TrendingUp className="h-5 w-5" />, value: "+300%", label: "Performance média" },
              { icon: <Building2 className="h-5 w-5" />, value: "+10.000", label: "Lojas ativas" },
              { icon: <Shield className="h-5 w-5" />, value: "99.9%", label: "Uptime garantido" }
            ].map((stat, index) => (
              <Card 
                key={index}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-semibold text-black mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
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
                Solicitar Acesso Exclusivo
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
                Explorar Demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-24 px-6 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Tecnologia que faz a
              <span className="block font-semibold">diferença</span>
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Recursos desenvolvidos para marcas que não aceitam o comum
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group"
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.1}s both`,
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

      {/* Testimonials with Infinite Scroll */}
      <section id="cases" className="py-24 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Resultados que
              <span className="block font-semibold">falam por si</span>
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Cases reais de marcas que escolheram a excelência
            </p>
          </div>
          
          {/* Infinite Scroll Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-8" style={{
              animation: 'scroll 30s linear infinite',
              width: 'fit-content'
            }}>
              {allTestimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="min-w-[400px] border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex-shrink-0"
                >
                  <CardContent className="pt-8 pb-8">
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-primary fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-8 italic text-lg leading-relaxed font-light">
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
                        <p className="text-gray-600 text-sm font-medium">
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

      {/* Contact Section */}
      <section id="contato" className="py-24 px-6 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
              Transforme sua marca
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Entre em contato e descubra como elevar sua operação digital
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact Form */}
            <Card className="border border-gray-100 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-black font-semibold">Solicitar Consulta</CardTitle>
                <CardDescription className="font-light">
                  Preencha os dados e nossa equipe entrará em contato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Nome</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="border-gray-200 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="border-gray-200 focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="border-gray-200 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Conte-nos sobre seu projeto"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="border-gray-200 focus:border-primary"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-black hover:bg-gray-900 text-white py-6">
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
                      <p className="text-sm text-gray-500">Segunda a sexta, 9h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
                      <Mail className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Email</h4>
                      <p className="text-gray-600">contato@catalogopro.com</p>
                      <p className="text-sm text-gray-500">Resposta em até 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">Endereço</h4>
                      <p className="text-gray-600">
                        Av. Faria Lima, 1234<br />
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
            Pronto para liderar?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto font-light">
            Junte-se às marcas que escolheram a tecnologia premium
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-primary hover:bg-primary/90 text-black shadow-xl"
              >
                Solicitar Acesso Exclusivo
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 border-white text-white hover:bg-white hover:text-black"
              >
                Explorar Demonstração Privada
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="bg-white py-16 px-6 border-t border-gray-100">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-semibold text-black tracking-tight">CatalogoPro</span>
              </div>
              <p className="text-gray-600 leading-relaxed font-light">
                Tecnologia premium para marcas que lideram
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-black">Produto</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="#recursos" className="hover:text-black transition-colors font-light">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#cases" className="hover:text-black transition-colors font-light">
                    Cases
                  </a>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-black transition-colors font-light">
                    Demonstração
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-black">Suporte</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors font-light">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-black transition-colors font-light">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors font-light">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-black">Empresa</h4>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors font-light">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors font-light">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors font-light">
                    Termos
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-16 pt-8 text-center text-gray-500">
            <p className="font-light">&copy; 2024 CatalogoPro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
