import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  CheckCircle,
  Menu,
  ArrowRight,
  Play,
  ChevronRight,
  Sparkles,
  CreditCard,
  ShoppingCart,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PromotionalModal from "@/components/PromotionalModal";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPromotionalModal, setShowPromotionalModal] = useState(false);

  useEffect(() => {
    document.title = "Wibbo - Sistema de Catálogo e Vendas Online";

    const hasShownModal = sessionStorage.getItem('promotionalModalShown');
    if (!hasShownModal) {
      const promotionalTimer = setTimeout(() => {
        setShowPromotionalModal(true);
        sessionStorage.setItem('promotionalModalShown', 'true');
      }, 10000);
      
      return () => clearTimeout(promotionalTimer);
    }
  }, []);

  const features = [
    {
      icon: <Package className="h-12 w-12" />,
      title: "Catálogo Digital",
      description: "Organize e apresente todos os seus produtos de forma profissional. Catálogo responsivo com busca avançada e categorização inteligente.",
      features: [
        "Subdomínio personalizado",
        "Design profissional",
        "Busca avançada",
        "Categorização inteligente"
      ]
    },
    {
      icon: <ShoppingCart className="h-12 w-12" />,
      title: "Pedidos Online",
      description: "Sistema completo de gestão de pedidos. Seus clientes fazem pedidos diretamente pelo catálogo e você gerencia tudo em um só lugar.",
      features: [
        "Pedidos em tempo real",
        "Notificações automáticas",
        "Gestão centralizada",
        "Histórico completo"
      ]
    },
    {
      icon: <CreditCard className="h-12 w-12" />,
      title: "Pagamentos Integrados",
      description: "Receba pagamentos diretamente na plataforma. PIX, cartão de crédito e boleto com checkout seguro e rápido.",
      features: [
        "PIX instantâneo",
        "Cartão de crédito",
        "Boleto bancário",
        "Checkout seguro"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">W</span>
              </div>
              <h1 className="text-xl font-semibold text-foreground">Wibbo</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a href="#recursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Recursos
              </a>
              <a href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Demonstração
              </a>
              <div className="flex items-center space-x-3 ml-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Entrar</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Começar Agora</Button>
                </Link>
              </div>
            </nav>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t animate-fade-in">
              <div className="flex flex-col space-y-4 pt-4">
                <a href="#recursos" className="text-sm text-muted-foreground hover:text-foreground px-4 py-2">
                  Recursos
                </a>
                <a href="#demo" className="text-sm text-muted-foreground hover:text-foreground px-4 py-2">
                  Demonstração
                </a>
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t">
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="w-full">Entrar</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="w-full">Começar Agora</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="h-3 w-3 mr-2" />
            Sistema completo de vendas online
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Venda Online com
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Catálogo + Pagamentos
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Catálogo digital profissional, pedidos online e pagamentos integrados. Tudo em uma única plataforma.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Começar Agora Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <a href="#demo">
                <Play className="mr-2 h-5 w-5" />
                Ver Demonstração
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">+350%</div>
              <div className="text-sm text-muted-foreground">Aumento em vendas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">10k+</div>
              <div className="text-sm text-muted-foreground">Empresas ativas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">R$ 50M+</div>
              <div className="text-sm text-muted-foreground">Em vendas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section id="recursos" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Tudo para vender online
            </h2>
            <p className="text-xl text-muted-foreground">
              Sistema completo: do catálogo ao pagamento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section id="demo" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Veja como funciona
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Assista à demonstração completa da plataforma
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-muted">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <Button size="lg" className="h-20 w-20 rounded-full">
                  <Play className="h-8 w-8" />
                </Button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop" 
                alt="Video demonstração" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Background CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="container mx-auto relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Comece a vender hoje
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90">
            Crie seu catálogo, receba pedidos e pagamentos em minutos
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-7">
              Criar Conta Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 px-6 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">W</span>
                </div>
                <span className="text-foreground font-semibold text-lg">Wibbo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema completo para catálogos digitais e vendas online
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#recursos" className="hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#demo" className="hover:text-foreground transition-colors">Demonstração</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Central de Ajuda</a></li>
                <li><Link to="/login" className="hover:text-foreground transition-colors">Acessar Sistema</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Wibbo. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <PromotionalModal 
        isOpen={showPromotionalModal} 
        onClose={() => setShowPromotionalModal(false)} 
      />
    </div>
  );
};

export default Index;
