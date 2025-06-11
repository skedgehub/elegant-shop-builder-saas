
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
  Sparkles,
  Crown,
  Layers,
  Lock,
  Gauge,
  ChevronRight,
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

  const exclusiveFeatures = [
    {
      icon: <Crown className="h-5 w-5" />,
      title: "Subdomínio Personalizado",
      description: "Configure sua identidade digital exclusiva com domínios próprios",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Campos Inteligentes",
      description: "Customização avançada que se adapta ao seu modelo de negócio",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Painel Avançado",
      description: "Analytics em tempo real para decisões estratégicas precisas",
    },
    {
      icon: <Gauge className="h-5 w-5" />,
      title: "Performance Premium",
      description: "Tecnologia de ponta para experiências ultrarrápidas",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Segurança Institucional",
      description: "Proteção de dados com padrões empresariais avançados",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Tecnologia Escalável",
      description: "Infraestrutura que cresce com sua operação digital",
    },
  ];

  const plans = [
    {
      name: "Professional",
      price: "R$ 297",
      period: "/mês",
      description: "Para marcas em crescimento acelerado",
      features: [
        "Até 1.000 produtos premium",
        "3 subdomínios personalizados",
        "Categorias ilimitadas",
        "Suporte prioritário dedicado",
        "Campos personalizados avançados",
        "Analytics institucional",
        "Backup automático seguro",
      ],
      highlighted: false,
    },
    {
      name: "Enterprise",
      price: "R$ 797",
      period: "/mês",
      description: "Para operações digitais de alto impacto",
      features: [
        "Produtos ilimitados",
        "Subdomínios ilimitados",
        "Acesso multi-usuário",
        "Suporte premium 24/7",
        "API completa empresarial",
        "White label exclusivo",
        "Consultor estratégico dedicado",
        "Integração personalizada",
      ],
      highlighted: true,
    },
    {
      name: "Custom",
      price: "Sob consulta",
      period: "",
      description: "Soluções exclusivas para grandes corporações",
      features: [
        "Desenvolvimento personalizado",
        "Infraestrutura dedicada",
        "SLA garantido",
        "Compliance avançado",
        "Integração enterprise",
        "Consultoria estratégica",
        "Implementação dedicada",
      ],
      highlighted: false,
    },
  ];

  const testimonials = [
    {
      name: "Helena Martins",
      company: "Fundadora da ModaStyle",
      content: "Com a CatalogoPro, crescemos 4x em vendas nos primeiros 2 meses. A tecnologia simplesmente funciona.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Roberto Silva",
      company: "CEO da TechCorp",
      content: "Finalmente uma plataforma que entende as necessidades de empresas que vendem tecnologia de ponta.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Marina Costa",
      company: "Diretora Digital - SportsPro",
      content: "A diferença na conversão foi imediata. Nossos clientes notaram a mudança na primeira semana.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden relative">
      {/* Subtle background decorations */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/3 to-blue-400/3 rounded-full blur-3xl animate-glow"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/3 to-primary/3 rounded-full blur-3xl animate-glow" style={{ animationDelay: '2s' }}></div>
        
        {/* Geometric elements */}
        <div className="absolute top-1/3 right-20 w-2 h-20 bg-gray-100 rotate-45 opacity-30"></div>
        <div className="absolute bottom-1/3 left-20 w-1 h-32 bg-gray-100 rotate-12 opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating Contact Button */}
      <a
        href="#contact"
        className="fixed bottom-8 right-8 z-50 bg-black hover:bg-gray-800 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 backdrop-blur-sm group"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
      </a>

      {/* Premium Header */}
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-fade-in">
              <div className="h-8 w-8 bg-gradient-premium rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-dm font-semibold text-gray-900">CatalogoPro</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm tracking-wide">
                Funcionalidades
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm tracking-wide">
                Investimento
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm tracking-wide">
                Cases
              </a>

              <div className="flex items-center space-x-4 ml-8 border-l border-gray-200 pl-8">
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-gray-50 border-gray-200 text-gray-700 font-medium"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-black hover:bg-gray-800 text-white font-medium px-6">
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
            <div className="md:hidden mt-6 py-6 border-t border-gray-100 bg-white/95 backdrop-blur-lg rounded-lg animate-slide-in">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 font-medium">
                  Funcionalidades
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 font-medium">
                  Investimento
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 font-medium">
                  Cases
                </a>
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-100">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="w-full bg-black hover:bg-gray-800 text-white">
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
      <section className="pt-20 pb-32 px-8 relative overflow-hidden z-10">        
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-8 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 transition-colors animate-fade-in">
            <Sparkles className="h-3 w-3 mr-2" />
            Acesso exclusivo para marcas visionárias
          </Badge>

          <h1 className="text-6xl md:text-8xl font-playfair font-medium text-gray-900 mb-8 leading-[0.9] animate-fade-in">
            Tecnologia para marcas
            <span className="block bg-gradient-premium bg-clip-text text-transparent font-playfair font-medium" style={{ animationDelay: '0.2s' }}>
              que vendem mais
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed font-dm animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Uma plataforma premium para catálogos digitais.{" "}
            <span className="text-gray-900 font-medium">Performance, personalização e exclusividade</span>{" "}
            em cada detalhe da sua operação digital.
          </p>

          {/* Performance Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {[
              { icon: <TrendingUp className="h-6 w-6" />, value: "+300%", label: "Performance média", desc: "Aumento em conversão" },
              { icon: <Users className="h-6 w-6" />, value: "+10.000", label: "Lojas ativas", desc: "Empresas confiantes" },
              { icon: <Shield className="h-6 w-6" />, value: "99.9%", label: "Uptime garantido", desc: "Disponibilidade premium" }
            ].map((stat, index) => (
              <Card 
                key={index}
                className="bg-white/60 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-lg hover:bg-white/80 transition-all duration-500 hover:-translate-y-1 group overflow-hidden"
                style={{ 
                  animationDelay: `${0.6 + index * 0.1}s`,
                }}
              >
                <CardContent className="p-8 text-center">
                  <div className="h-12 w-12 bg-gray-50 rounded-xl mx-auto mb-4 flex items-center justify-center text-gray-600 group-hover:bg-gray-100 transition-colors">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-playfair font-medium text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-dm font-medium text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <Link to="/register">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all group font-dm font-medium"
              >
                Solicitar Acesso Exclusivo
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 border border-gray-300 hover:bg-gray-50 group backdrop-blur-sm font-dm font-medium"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Explorar Demonstração Privada
              </Button>
            </Link>
          </div>

          {/* Trust Section */}
          <div className="mt-20 animate-fade-in" style={{ animationDelay: '1.1s' }}>
            <p className="text-sm text-gray-500 mb-6 font-dm tracking-wide">
              Confiado por empresas visionárias
            </p>
            <div className="flex items-center justify-center space-x-12 opacity-40">
              {["TechCorp", "ModaStyle", "FoodDelivery", "SportsPro"].map((company, index) => (
                <div 
                  key={company}
                  className="text-xl font-dm font-medium text-gray-400 hover:text-gray-600 transition-colors"
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

      {/* Exclusive Features Section */}
      <section id="features" className="py-32 px-8 bg-gradient-subtle relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-playfair font-medium text-gray-900 mb-8">
              Benefícios
              <span className="block text-gray-600">exclusivos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-dm">
              Tecnologia avançada para marcas que não aceitam limitações
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {exclusiveFeatures.map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group overflow-hidden"
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <CardHeader className="pb-4">
                  <div className="h-10 w-10 bg-gray-50 rounded-lg mb-4 shadow-sm group-hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-700">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-gray-900 group-hover:text-black transition-colors font-dm font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed font-dm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Plans Section */}
      <section id="pricing" className="py-32 px-8 bg-white relative overflow-hidden z-10">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-playfair font-medium text-gray-900 mb-8">
              Investimento que
              <span className="block text-gray-600">transforma resultados</span>
            </h2>
            <p className="text-xl text-gray-600 font-dm">
              Planos desenvolvidos para diferentes estágios de crescimento
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  plan.highlighted
                    ? "border-2 border-black shadow-2xl scale-105 bg-white"
                    : "border border-gray-200 bg-white hover:shadow-xl"
                }`}
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                {plan.highlighted && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-premium"></div>
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white shadow-lg z-20 font-dm">
                      Recomendado
                    </Badge>
                  </>
                )}
                <CardHeader className="text-center pb-6">
                  <div className={`h-12 w-12 rounded-lg mx-auto mb-6 flex items-center justify-center shadow-sm ${
                    plan.highlighted ? 'bg-black text-white' : 'bg-gray-50 text-gray-700'
                  }`}>
                    <span className="font-dm font-semibold text-lg">
                      {plan.name[0]}
                    </span>
                  </div>
                  <CardTitle className="text-2xl text-gray-900 font-dm font-semibold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 font-dm">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-8">
                    <span className="text-4xl font-playfair font-medium text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-gray-600 text-lg font-dm">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-gray-700 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-dm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-8 transition-all duration-300 hover:scale-105 font-dm font-medium ${
                      plan.highlighted
                        ? "bg-black hover:bg-gray-800 text-white shadow-lg"
                        : "bg-gray-900 hover:bg-black text-white"
                    }`}
                  >
                    {plan.name === "Custom" ? "Consultar Especialista" : "Solicitar Acesso"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section id="testimonials" className="py-32 px-8 bg-gradient-subtle relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-playfair font-medium text-gray-900 mb-8">
              Cases de
              <span className="block text-gray-600">sucesso</span>
            </h2>
            <p className="text-xl text-gray-600 font-dm">Resultados reais de marcas que escolheram a excelência</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-gray-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 italic text-lg leading-relaxed font-dm">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-dm font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-600 text-sm font-dm">
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
      <section id="contact" className="py-32 px-8 bg-white relative overflow-hidden z-10">        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-playfair font-medium text-gray-900 mb-8">
              Conecte-se conosco
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-dm">
              Nossa equipe de especialistas está pronta para desenhar a solução ideal para sua empresa
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-gray-100 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 font-dm font-semibold text-xl">Solicitar Consultoria</CardTitle>
                <CardDescription className="font-dm">
                  Preencha os dados e nossa equipe entrará em contato em até 2 horas úteis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-dm font-medium">Nome completo</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="font-dm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-dm font-medium">Email corporativo</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@empresa.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="font-dm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-dm font-medium">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="font-dm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-dm font-medium">Desafio ou objetivo</Label>
                    <Textarea
                      id="message"
                      placeholder="Conte-nos sobre seu projeto e como podemos ajudar..."
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="font-dm"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-dm font-medium">
                    Enviar Solicitação
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-playfair font-medium text-gray-900 mb-8">
                  Canais de atendimento premium
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
                      <Phone className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-dm font-semibold text-gray-900">Atendimento Executivo</h4>
                      <p className="text-gray-600 font-dm">(11) 3000-0000</p>
                      <p className="text-sm text-gray-500 font-dm">Segunda a sexta, 9h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
                      <Mail className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-dm font-semibold text-gray-900">Email Corporativo</h4>
                      <p className="text-gray-600 font-dm">enterprise@catalogopro.com</p>
                      <p className="text-sm text-gray-500 font-dm">Resposta garantida em 2h úteis</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-50 rounded-lg p-3 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-dm font-semibold text-gray-900">Escritório</h4>
                      <p className="text-gray-600 font-dm">
                        Av. Paulista, 1000 - 15º andar<br />
                        São Paulo, SP - 01310-100
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-gray-50 border-gray-100">
                <CardContent className="p-6">
                  <h4 className="font-dm font-semibold text-gray-900 mb-4">
                    Horário de Atendimento Premium
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-dm">Segunda a Sexta</span>
                      <span className="text-gray-900 font-dm font-medium">9h às 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-dm">Suporte Urgente</span>
                      <span className="text-gray-900 font-dm font-medium">24/7 (Clientes Enterprise)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 px-8 bg-black text-white relative overflow-hidden z-10">        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-playfair font-medium mb-6 animate-fade-in">
            Transforme sua operação digital
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto font-dm animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Junte-se às marcas que escolheram tecnologia premium para resultados excepcionais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/register">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-white hover:bg-gray-100 text-black shadow-xl hover:scale-105 transition-all duration-300 font-dm font-medium"
              >
                Solicitar Acesso Exclusivo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 border border-gray-600 text-white hover:bg-white/10 shadow-xl backdrop-blur-sm hover:scale-105 transition-all duration-300 font-dm font-medium"
              >
                Explorar Demonstração
                <Play className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Refined Footer */}
      <footer className="bg-gray-900 text-white py-16 px-8 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-8 w-8 bg-gradient-premium rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-dm font-semibold">CatalogoPro</span>
              </div>
              <p className="text-gray-400 leading-relaxed font-dm">
                Tecnologia premium para marcas que buscam excelência em vendas digitais
              </p>
            </div>
            <div>
              <h4 className="font-dm font-semibold mb-6 text-lg">Plataforma</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors font-dm">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors font-dm">
                    Investimento
                  </a>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-white transition-colors font-dm">
                    Demonstração
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-dm font-semibold mb-6 text-lg">Suporte</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors font-dm">
                    Central Premium
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors font-dm">
                    Consultoria
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-dm">
                    Status da Plataforma
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-dm font-semibold mb-6 text-lg">Empresa</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors font-dm">
                    Nossa História
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-dm">
                    Cases de Sucesso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors font-dm">
                    Termos e Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="font-dm">&copy; 2024 CatalogoPro. Tecnologia premium para resultados excepcionais.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
